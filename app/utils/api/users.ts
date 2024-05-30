async function getAllUsers() {
	const response = await fetch("/api/users");
	const data = await response.json();
	return data;
}

async function getProfessorUsers() {
	const response = await fetch("/api/users?role=USER");
	const data = await response.json();
	return data;
}

export { getAllUsers, getProfessorUsers };
