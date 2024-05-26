import { decrypt, generateToken } from "@/app/utils/authHelpers";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const response = await fetch("http://localhost:3000/api/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});

	if (response.status !== 201) {
		throw new Error("Error logging in");
	}
	try {
		const { userId, username: user, role } = await response.json();

		const token = generateToken(userId, user, role);
		cookies().set("session", token, {
			secure: true,
			httpOnly: true,
			path: "/",
		});
	} catch (error) {
		throw new Error("Error logging in");
	}

	return response;
}

export async function register(formData: FormData) {
	await fetch("/api/register", {
		method: "POST",
		body: formData,
	});
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return decrypt(session);
}
