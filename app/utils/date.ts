import { Weekday } from "@prisma/client";
import { weekdayValues } from "../types/types";

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDateToShort(date: Date) {
	return date.toLocaleDateString("es-ES", { month: "short", day: "numeric" });
}

function formatDate(date: string, longMonth?: boolean, hideYear?: boolean) {
	const dateObj = new Date(date);
	const option = longMonth ? "long" : "short";

	if (hideYear) {
		return capitalize(
			dateObj
				.toLocaleDateString("es-ES", {
					month: option,
				})
				.replace(".", "")
				.replace("de", "")
		);
	}
	return capitalize(
		dateObj
			.toLocaleDateString("es-ES", { month: option, year: "numeric" })
			.replace(".", "")
			.replace("de", "")
	);
}

function formatDateLong(date: Date) {
	// format date string YYYY-MM-DD to MMMM DD, YYYY
	return date
		.toLocaleDateString("es-ES", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		.replace(/ de /g, " ")
		.replace(",", "")
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function showMonths(date: Date) {
	const start = new Date(date);
	const end = new Date(date);
	end.setDate(end.getDate() + 6);
	const startMonth = start.getMonth();
	const endMonth = end.getMonth();

	// to YYYY-MM-DD
	const startString = start.toISOString().split("T")[0];
	if (startMonth === endMonth) {
		return formatDate(startString, true);
	} else {
		const endString = end.toISOString().split("T")[0];
		if (start.getFullYear() === end.getFullYear()) {
			return `${formatDate(startString, true, true)} - ${formatDate(
				endString,
				true
			)}`;
		}
		return `${formatDate(startString, true)} - ${formatDate(endString, true)}`;
	}
}

function getDatesForWeekdays(
	startingDate: Date,
	endingDate: Date,
	weekdays: Weekday[]
) {
	const dates: Date[] = [];
	const weekdayNumbers = weekdays.map((weekday) => weekdayValues[weekday]);

	const getNextWeekday = (date: Date, weekday: number): Date => {
		const result = new Date(date);
		result.setDate(date.getDate() + ((7 + weekday - date.getDay()) % 7));
		return result;
	};

	let current = startingDate;
	// Iterate through each weekday
	for (const weekday of weekdayNumbers) {
		let current = getNextWeekday(startingDate, weekday);

		while (current <= endingDate) {
			dates.push(new Date(current));
			current.setDate(current.getDate() + 7); // Move to the next occurrence of the weekday
		}
	}

	dates.sort((a, b) => a.getTime() - b.getTime());

	return dates;
}

export {
	showMonths,
	formatDate,
	formatDateLong,
	formatDateToShort,
	getDatesForWeekdays,
};
