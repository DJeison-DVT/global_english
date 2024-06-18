import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = params.id;

		let courses = null;
		try {
			courses = await prisma.attended.findMany({
				where: {
					courseId,
				},
			});
		} catch (error) {
			console.error(error);
		}

		if (!courses) {
			return new Response("No courses found", { status: 404 });
		}

		return new Response(JSON.stringify(courses), { status: 200 });
	} catch (error) {
		console.error(error);
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = params.id;
		const body = await request.json();
		const { students, date } = body;

		try {
			await prisma.$transaction(
				students.map((studentId: number) =>
					prisma.attended.create({
						data: {
							courseId,
							studentId,
							date,
						},
					})
				)
			);
		} catch (error) {
			console.error(error);
			return new Response(null, { status: 409 });
		}

		return new Response(null, { status: 201 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
