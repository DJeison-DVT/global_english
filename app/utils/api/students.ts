import { getApiURL } from "@/lib/utils";

export async function getStudentsByClass(id: number) {
	const res = await fetch(getApiURL(`/api/student/class/${id}`));
	return await res.json();
}
