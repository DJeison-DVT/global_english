export async function getStudentsByClass(id: number) {
	const res = await fetch(`/api/student/class/${id}`);
	return await res.json();
}
