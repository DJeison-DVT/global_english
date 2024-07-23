import { getApiURL } from "@/lib/utils";
import { CourseSchema } from "@/lib/zod";
import { Course } from "@prisma/client";
import { z } from "zod";

async function getAllClasses() {
	const response = await fetch(getApiURL("/api/class"));
	const data = await response.json();
	return data;
}

async function getClassById(id: number) {
	const response = await fetch(getApiURL(`/api/class/${id}`));

	if (!response.ok) {
		throw new Error("Class not found");
	}

	const data: Course = await response.json();
	return data;
}

async function getClassByUser(userId: string) {
	const response = await fetch(getApiURL(`/api/class/user/${userId}`));
	const data = await response.json();
	return data;
}

async function getClassBySupervisor(userId: string) {
	const response = await fetch(getApiURL(`/api/class/supervisor/${userId}`));
	const data = await response.json();
	return data;
}

async function createClass(formData: z.infer<typeof CourseSchema>) {
	console.log("sending data to create class");
	const response = await fetch(getApiURL("/api/class"), {
		body: JSON.stringify(formData),
		method: "POST",
	});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data);
	}
	return data;
}

async function deleteClass(id: string) {
	const response = await fetch(getApiURL(`/api/class/${id}`), {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Error deleting class");
	}
}

export {
	getAllClasses,
	getClassByUser,
	getClassBySupervisor,
	createClass,
	getClassById,
	deleteClass,
};
