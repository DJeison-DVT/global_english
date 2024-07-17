export async function getAssistanceByClass(classId: string) {
	const response = await fetch(`api/assistance/${classId}`);

	if (response.status === 404) {
		return null;
	}

	const data = await response.json();
	return data;
}
