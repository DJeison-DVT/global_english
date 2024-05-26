import { compare } from "bcryptjs";
import { User } from "@/lib/zod";
import prisma from "@/prisma/db";
import { generateToken } from "@/app/utils/authHelpers";

export async function POST(request: Request) {
	try {
		// Input validation
		const { username, password } = await request.json();
		console.log(username, password);
		try {
			User.parse({ username, password });
		} catch (error) {
			return new Response("Incorrect input", { status: 400 });
		}

		// Authentication
		const user = await prisma.user.findUnique({
			where: { username },
		});
		if (!user) {
			return new Response("User not found", { status: 404 });
		}
		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			return new Response("Invalid password", { status: 400 });
		}

		const response = new Response(JSON.stringify(user), { status: 201 });
		return response;
	} catch (error) {
		return new Response("Error logging in", { status: 500 });
	}
}
