import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		let courses;
		try {
			courses = await prisma.course.findUnique({
				where: {
					id,
				},
			});
		} catch (error) {
			console.error(error);
			return new Response("Error getting companies", { status: 500 });
		}

		if (!courses) {
			return new Response("Course not found", { status: 404 });
		}

		return new Response(JSON.stringify(courses), { status: 200 });
	} catch (error) {
		return new Response("Error getting companies", { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		const course = await prisma.course.delete({
			where: {
				id,
			},
		});

		return new Response(JSON.stringify(course), { status: 200 });
	} catch (error) {
		return new Response("Error deleting course", { status: 500 });
	}
}
