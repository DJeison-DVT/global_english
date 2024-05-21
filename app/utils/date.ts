function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
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

function formatDateLong(date: string) {
	// format date string YYYY-MM-DD to MMMM DD, YYYY
	const dateComponents = date.split("-");
	const dateFormatted = new Date(
		dateComponents[1] + "-" + dateComponents[2] + "-" + dateComponents[0]
	);
	const dateObj = new Date(dateFormatted);
	return dateObj
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

export { showMonths, formatDate, formatDateLong };
