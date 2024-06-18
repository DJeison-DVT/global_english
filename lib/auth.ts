"use server";

import { Token, decrypt, generateToken } from "@/app/utils/authHelpers";
import { cookies } from "next/headers";
import { URLBuilder } from "./utils";
import { z } from "zod";
import { UserCreationSchema } from "./zod";

export async function login(formData: FormData) {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const response = await fetch(URLBuilder("/api/login"), {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});

	if (response.status !== 201) {
		console.log(response.status);
		throw new Error(response.statusText);
	}
	try {
		const { userId, username: user, role } = await response.json();

		const token = generateToken(userId, user, role);
		cookies().set("session", token, {
			secure: true,
			httpOnly: true,
			path: "/",
			sameSite: "strict",
		});
	} catch (error) {
		throw new Error("Failed to generate token");
	}

	return response;
}

export async function register(formData: z.infer<typeof UserCreationSchema>) {
	const { username, password, role, name, surname } = formData;
	await fetch(URLBuilder("/api/register"), {
		method: "POST",
		body: JSON.stringify({ username, password, role, name, surname }),
	});
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return decrypt(session) as Token;
}

export async function logout() {
	cookies().set("session", "", {
		secure: true,
		httpOnly: true,
		path: "/",
		sameSite: "strict",
		expires: new Date(0),
	});

	return new Response(null, { status: 201 });
}
