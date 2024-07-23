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

		const userId = user.id;

		const courseIds = await prisma.courseSupervisor.findMany({
			where: {
				userId,
			},
			select: {
				courseId: true,
			},
		});

		const courses = await prisma.course.findMany({
			where: {
				id: {
					in: courseIds.map((course) => course.courseId),
				},
			},
		});

		return new Response(JSON.stringify(courses), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{
				status: 500,
			}
		);
	}
}
