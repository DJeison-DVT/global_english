import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const students = await prisma.student.findMany();

		if (!students) {
			return new Response("No students found", { status: 404 });
		}

		return new Response(JSON.stringify(students), { status: 200 });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
}
