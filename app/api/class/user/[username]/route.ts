import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { username: string } }
) {
	try {
		const username = params.username;
		const user = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (!user) {
			return new Response("User not found", { status: 404 });
		}

		const courses = await prisma.course.findMany({
			where: {
				professorId: user.id,
			},
		});

		return new Response(JSON.stringify(courses), { status: 200 });
	} catch (error) {
		return new Response("Error getting companies", { status: 500 });
	}
}
