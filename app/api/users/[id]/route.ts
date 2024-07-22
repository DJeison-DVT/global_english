import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		let user;
		try {
			user = await prisma.user.findUnique({
				where: {
					id,
				},
			});
		} catch (error) {
			console.error(error);
			return new Response("Error getting user", { status: 500 });
		}

		if (!user) {
			return new Response("User not found", { status: 404 });
		}

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		return new Response("Error getting user", { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		try {
			const user = await prisma.user.delete({
				where: {
					id,
				},
			});
			return new Response(JSON.stringify(user), { status: 200 });
		} catch (error) {
			console.error(error);
			return new Response("Error in DB ", { status: 500 });
		}
	} catch (error) {
		return new Response("Error deleting user", { status: 500 });
	}
}
