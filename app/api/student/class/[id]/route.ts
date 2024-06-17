import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);

		const students = await prisma.student.findMany({
			where: {
				courseId,
			},
		});

		if (!students) {
			return new Response("No students found", { status: 404 });
		}

		return new Response(JSON.stringify(students), { status: 200 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);
		const { students }: { students: string[] } = await request.json();

		let registeredStudents = null;
		try {
			registeredStudents = await prisma.$transaction(
				students.map((student) =>
					prisma.student.create({
						data: {
							fullname: student,
							courseId,
						},
					})
				)
			);
		} catch (error) {
			console.error(error);
			return new Response(null, { status: 409 });
		}

		if (students.length !== registeredStudents.length) {
			return new Response(null, { status: 500 });
		}

		return new Response(JSON.stringify(registeredStudents), { status: 200 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
