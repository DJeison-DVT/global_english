import { NextRequest } from "next/server";
import prisma from "@/prisma/db";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);

		const supervisors = await prisma.courseSupervisor.findMany({
			where: {
				courseId,
			},
			select: {
				userId: true,
			},
		});

		return new Response(JSON.stringify(supervisors), { status: 200 });
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

export async function POST(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const courseId = Number(params.id);
		const body = await request.json();
		const { supervisors } = body;

		try {
			await prisma.$transaction(async (prisma) => {
				// Delete existing supervisors for the given course ID
				await prisma.courseSupervisor.deleteMany({
					where: {
						courseId,
					},
				});

				// Create new supervisors
				if (supervisors.length > 0) {
					await prisma.courseSupervisor.createMany({
						data: supervisors.map((userId: number) => ({
							courseId: Number(courseId),
							userId: Number(userId),
						})),
					});
				}
			});

			return new Response(null, { status: 201 });
		} catch (error) {
			console.error(error);
			return new Response(
				JSON.stringify({
					error: "Conflict while updating supervisors",
				}),
				{ status: 409 }
			);
		}
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ error: "Internal Server Error" }),
			{ status: 500 }
		);
	}
}
