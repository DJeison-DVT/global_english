"use server";
import { Student } from "@/app/types/types";
import { getApiURL } from "@/lib/utils";

export async function getAssistanceByClass(classId: string) {
	const response = await fetch(getApiURL(`/api/assistance/class/${classId}`));

	if (response.status === 404) {
		return null;
	}

	if (!response.ok && response.status !== 404) {
		throw new Error("An error occurred while fetching the data.");
	}

	const data = await response.json();
	return data;
}

export async function createAssistance(
	classId: number,
	date: string,
	students: String[]
) {
	const response = await fetch(getApiURL(`/api/assistance/class/${classId}`), {
		method: "POST",
		body: JSON.stringify({
			date: date,
			students,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response.ok;
}
