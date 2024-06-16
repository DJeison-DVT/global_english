import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = params.id;

		const courses = await prisma.course.findMany({
			where: {
				id,
			},
		});

		return new Response(JSON.stringify(courses), { status: 200 });
	} catch (error) {
		return new Response("Error getting companies", { status: 500 });
	}
}
