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
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	console.log("POST /api/students/class/:id");
	try {
		const courseId = Number(params.id);
		const { students }: { students: string[] } = await request.json();

		const existingStudents = await prisma.student.findMany({
			where: { courseId },
			select: { fullname: true },
		});

		const existingStudentNames = existingStudents.map(
			(student) => student.fullname
		);

		const studentsToCreate = students.filter(
			(student) => !existingStudentNames.includes(student)
		);
		const studentsToDelete = existingStudentNames.filter(
			(existingStudent) => !students.includes(existingStudent)
		);

		try {
			// Delete students not in the new list
			const result = await prisma.$transaction(async (prisma) => {
				if (studentsToDelete.length > 0) {
					await prisma.student.deleteMany({
						where: {
							courseId,
							fullname: { in: studentsToDelete },
						},
					});
				}

				// Create new students
				if (studentsToCreate.length > 0) {
					await prisma.student.createMany({
						data: studentsToCreate.map((student) => ({
							fullname: student,
							courseId,
						})),
					});
				}

				// Fetch the updated list of students
				const registeredStudents = await prisma.student.findMany({
					where: { courseId },
				});

				return registeredStudents;
			});
			return new Response(JSON.stringify(result), { status: 200 });
		} catch (error) {
			console.error(error);
			return new Response(null, { status: 409 });
		}
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
