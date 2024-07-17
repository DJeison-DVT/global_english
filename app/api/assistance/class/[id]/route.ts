import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);

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
		const courseId = Number(params.id);
		const body = await request.json();
		const { students, date } = body;

		const start = new Date(date).setUTCHours(0, 0, 0, 0);
		const formattedDate = new Date(start).toISOString();
		try {
			await prisma.$transaction(async (prisma) => {
				// Delete existing attendance records for the given course and date
				await prisma.attended.deleteMany({
					where: {
						courseId,
						date: formattedDate,
					},
				});

				// Create new attendance records
				await prisma.attended.createMany({
					data: students.map((studentId: number) => ({
						courseId,
						studentId,
						date: formattedDate,
					})),
				});
			});

			return new Response(null, { status: 201 });
		} catch (error) {
			console.error(error);
			return new Response(null, { status: 409 });
		}
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);

		try {
			await prisma.attended.deleteMany({
				where: {
					courseId,
				},
			});

			return new Response(null, { status: 204 });
		} catch (error) {
			console.error(error);
			return new Response(null, { status: 409 });
		}
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
