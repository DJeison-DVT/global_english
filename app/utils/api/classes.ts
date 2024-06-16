import { URLBuilder } from "@/lib/utils";
import { CourseSchema } from "@/lib/zod";
import { z } from "zod";

async function getAllClasses() {
	const response = await fetch("/api/class");
	const data = await response.json();
	return data;
}

async function getClassById(id: number) {
	const response = await fetch(`/api/class/${id}`);
	const data = await response.json();
	return data;
}

async function getClassByUser(userId: string) {
	const response = await fetch(URLBuilder(`/api/class/user/${userId}`));
	const data = await response.json();
	return data;
}

async function createClass(formData: z.infer<typeof CourseSchema>) {
	console.log("sending data to create class");
	const response = await fetch("/api/class", {
		body: JSON.stringify(formData),
		method: "POST",
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data);
	}
	return data;
}

export { getAllClasses, getClassByUser, createClass };
