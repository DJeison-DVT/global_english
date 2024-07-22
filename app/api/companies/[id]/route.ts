import prisma from "@/prisma/db";
import { NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		let company;
		try {
			company = await prisma.company.findUnique({
				where: {
					id,
				},
			});
		} catch (error) {
			console.error(error);
			return new Response("Error getting company", { status: 500 });
		}

		if (!company) {
			return new Response("Company not found", { status: 404 });
		}

		return new Response(JSON.stringify(company), { status: 200 });
	} catch (error) {
		return new Response("Error getting company", { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const id = Number(params.id);

		try {
			const company = await prisma.company.delete({
				where: {
					id,
				},
			});
			return new Response(JSON.stringify(company), { status: 200 });
		} catch (error) {
			console.error(error);
			return new Response("Error in DB ", { status: 500 });
		}
	} catch (error) {
		return new Response("Error deleting company", { status: 500 });
	}
}
