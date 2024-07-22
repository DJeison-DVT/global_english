import { getApiURL } from "@/lib/utils";

async function getAllCompanies() {
	const response = await fetch(getApiURL("/api/companies"));
	const data = await response.json();
	return data;
}

async function createCompany(formData: { name: string }) {
	const response = await fetch(getApiURL("/api/companies"), {
		body: JSON.stringify(formData),
		method: "POST",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data);
	}
	return data;
}

async function deleteCompany(id: string) {
	const response = await fetch(getApiURL(`/api/companies/${id}`), {
		method: "DELETE",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data);
	}
	return data;
}

export { getAllCompanies, createCompany, deleteCompany };
