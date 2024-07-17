import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
const isServer = () => typeof window === "undefined";

export function getApiURL(endpoint: string) {
	if (isServer()) {
		// If server-side, construct full URL
		const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
		return `${apiUrl}${endpoint}`;
	}
	// If client-side, use relative URL
	return endpoint;
}
