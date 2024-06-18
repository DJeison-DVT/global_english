import { CompanySchema } from "@/lib/zod";
import prisma from "@/prisma/db";

export async function GET(request: Request) {
	try {
		const companies = await prisma.company.findMany();
		return new Response(JSON.stringify(companies), { status: 200 });
	} catch (error) {
		return new Response("Error fetching companies", { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { name } = await request.json();
		if (!name) {
			return new Response("Not all of the required fields were filled", {
				status: 400,
			});
		}

		try {
			CompanySchema.parse({ name });
		} catch (error) {
			return new Response("Incorrect input", { status: 400 });
		}

		let company = null;
		try {
			company = await prisma.company.create({
				data: {
					name,
				},
			});
		} catch (error) {
			return new Response("Error creating company in the database", {
				status: 500,
			});
		}

		const response = new Response(JSON.stringify(company), { status: 201 });
		return response;
	} catch (error) {
		return new Response("Error creating company", { status: 500 });
	}
}
