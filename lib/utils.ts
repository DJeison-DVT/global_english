import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function URLBuilder(url: string) {
	const BASE_URL = process.env.BASE_URL || "localhost:3000";
	let URL = "";

	if (BASE_URL) {
		URL = `${BASE_URL}${url}`;
	} else {
		if (process.env.NODE_ENV === "development") {
			URL = `http://localhost:3000${url}`;
		} else if (
			process.env.VERCEL_URL &&
			process.env.NODE_ENV === "production"
		) {
			URL = `https://${process.env.VERCEL_URL}${url}`;
		} else if (process.env.VERCEL_BRANCH_URL) {
			URL = `https://${process.env.VERCEL_BRANCH_URL}${url}`;
		}
	}

	if (!URL.startsWith("http"))
		URL = `${
			process.env.NODE_ENV === "development" ? "http" : "https"
		}://${URL}`;
	return URL;
}
