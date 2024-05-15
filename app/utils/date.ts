function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date: string) {
	const dateObj = new Date(date);

	return capitalize(
		dateObj
			.toLocaleDateString("es-ES", { month: "short", year: "numeric" })
			.replace(".", "")
	);
}

function formatDateLong(date: string) {
	const dateObj = new Date(date);
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

export { formatDate, formatDateLong };
