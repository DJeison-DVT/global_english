import { URLBuilder } from "@/lib/utils";

async function getAllCompanies() {
	const response = await fetch(URLBuilder("/api/companies"));
	const data = await response.json();
	return data;
}

async function createCompany(formData: { name: string }) {
	const response = await fetch("/api/companies", {
		body: JSON.stringify(formData),
		method: "POST",
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data);
	}
	return data;
}

export { getAllCompanies, createCompany };
