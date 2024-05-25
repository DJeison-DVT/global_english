import { UserCreation } from "@/lib/zod";
import { hash } from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/prisma/db";
import generateToken from "@/app/utils/authHelpers";

export async function POST(request: Request) {
	try {
		const { username, password, role } = await request.json();
		if (!username || !password) {
			return new Response("Username and password are required", {
				status: 400,
			});
		}
		try {
			UserCreation.parse({ username, password, role });
		} catch (error) {
			return new Response("Incorrect input", { status: 400 });
		}
		let hashedPassword = "";
		try {
			hashedPassword = await hash(password, 10);
		} catch (error) {
			return new Response("Error hashing password", { status: 500 });
		}
		let user = null;
		try {
			user = await prisma.user.create({
				data: {
					username,
					password: hashedPassword,
					role: role || "USER",
				},
			});
		} catch (error) {
			return new Response("Error creating user", { status: 500 });
		}

		const token = generateToken(user.id, user.username, user.role);
		const response = new Response(JSON.stringify(user), { status: 201 });
		response.headers.set(
			"Set-Cookie",
			`token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict;`
		);

		return response;
	} catch (error) {
		return new Response("Error creating user", { status: 500 });
	}
}
