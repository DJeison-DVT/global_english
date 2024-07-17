import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function URLBuilder(url: string) {
	const BASE_URL = process.env.BASE_URL;
	console.log(BASE_URL + url);
	return BASE_URL + url;
}
