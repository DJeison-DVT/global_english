async function getProfessorUsers() {
	const response = await fetch("/api/users?role=USER");
	const data = await response.json();
	return data;
}

export { getProfessorUsers };
