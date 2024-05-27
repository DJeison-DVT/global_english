import prisma from "@/prisma/db";
import { Role } from "@prisma/client";

export async function GET(request: Request) {
	try {
		let role = null;
		try {
			const url = new URL(request.url);
			role = url.searchParams.get("role") as Role;
			if (role && !["ADMIN", "USER"].includes(role)) {
				return new Response("Invalid role", { status: 400 });
			}
		} catch (error) {
			return new Response("Error parsing query params", { status: 400 });
		}

		const users = await prisma.user.findMany({
			where: role ? { role } : {},
			select: {
				id: true,
				username: true,
				role: true,
				Course: true,
				surname: true,
				name: true,
			},
		});

		return new Response(JSON.stringify(users), { status: 200 });
	} catch (error) {
		return new Response("Error fetching users", { status: 500 });
	}
}
