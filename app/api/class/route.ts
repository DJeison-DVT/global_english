import { CourseSchema } from "@/lib/zod";
import prisma from "@/prisma/db";

export async function GET(request: Request) {
	try {
		const companies = await prisma.course.findMany();
		const response = new Response(JSON.stringify(companies), { status: 200 });
		return response;
	} catch (error) {
		return new Response("Error getting companies", { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		console.log("POST");
		const { name, level, companyId, professorId, dateRange, weekdays } =
			await request.json();
		if (
			!name ||
			!level ||
			!dateRange ||
			!weekdays ||
			!companyId ||
			!professorId
		) {
			return new Response("Not all of the required fields were filled", {
				status: 400,
			});
		}

		// convert date string to date obj

		try {
			dateRange.from = new Date(dateRange.from);
			dateRange.to = new Date(dateRange.to);
			CourseSchema.parse({
				name,
				level,
				companyId,
				professorId,
				dateRange,
				weekdays,
			});
		} catch (error) {
			return new Response("Incorrect input", { status: 400 });
		}

		let course = null;
		try {
			course = await prisma.course.create({
				data: {
					name,
					level,
					companyId,
					professorId,
					startingDate: dateRange.from,
					endingDate: dateRange.to,
					weekdays: weekdays.map((day: string) => day.toUpperCase()),
				},
			});
		} catch (error) {
			console.error(error);
			return new Response("Error creating company in the database", {
				status: 500,
			});
		}

		const response = new Response(JSON.stringify(course), { status: 201 });
		return response;
	} catch (error) {
		return new Response("Error creating company", { status: 500 });
	}
}
