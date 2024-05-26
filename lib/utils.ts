import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function URLBuilder(url: string) {
	const BASE_URL = process.env.VERCEL_URL || process.env.BASE_URL;
	if (process.env.VERCEL_ENV) return `https://${BASE_URL}${url}`;
	if (process.env.NODE_ENV === "development") return `http://${BASE_URL}${url}`;
	else {
		return `https://${BASE_URL}${url}`;
	}
}
