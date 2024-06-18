import { URLBuilder } from "@/lib/utils";

export async function getStudentsByClass(id: number) {
	const res = await fetch(URLBuilder(`/api/student/class/${id}`));
	return await res.json();
}
