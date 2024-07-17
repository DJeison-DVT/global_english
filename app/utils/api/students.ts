import { getApiURL } from "@/lib/utils";
import { StudentsCreationSchema } from "@/lib/zod";
import { z } from "zod";

export async function getStudentsByClass(id: number) {
	const res = await fetch(getApiURL(`/api/student/class/${id}`));
	return await res.json();
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
	return data;
}
