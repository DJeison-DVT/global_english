"use server";
import { revalidatePath } from "next/cache";

import { getApiURL } from "@/lib/utils";
import { StudentsCreationSchema } from "@/lib/zod";
import { z } from "zod";

export async function getStudentsByClass(id: number) {
	const res = await fetch(getApiURL(`/api/student/class/${id}`));
	if (!res.ok) {
		throw new Error(`HTTP error! Status: ${res.status}`);
	}
	const result = await res.json();
	console.log(result);
	return result;
}

export async function createStudents(
	id: number,
	formData: z.infer<typeof StudentsCreationSchema>
) {
	const transformedData = {
		students: formData.students
			.map((student) => student.name)
			.filter((name) => name.trim() !== ""), // Exclude empty strings
	};

	const response = await fetch(getApiURL(`/api/student/class/${id}`), {
		method: "POST",
		headers: {
			"Content-Type": "application/json", // Ensure the content type is set to JSON
		},
		body: JSON.stringify(transformedData),
	});

	const data = await response.json();

	revalidatePath("/api/student/class/[id]', 'route'");
	return data;
}
