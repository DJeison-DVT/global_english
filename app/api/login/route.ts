import { compare } from "bcryptjs";
import { User } from "@/lib/zod";
import prisma from "@/prisma/db";
import generateToken from "@/app/utils/authHelpers";

export async function POST(request: Request) {
	try {
		// Input validation
		const { username, password } = await request.json();
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

		// Generate token
		const token = generateToken(user.id, user.username, user.role);
		return new Response(JSON.stringify({ token }), { status: 200 });
	} catch (error) {
		return new Response("Error logging in", { status: 500 });
	}
}
