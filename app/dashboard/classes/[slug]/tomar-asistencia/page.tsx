"use client";

import { useState } from "react";
import { formatDateLong } from "@/app/utils/date";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { classAssistance } from "@/app/utils/consts";

export default function Page() {
	const [selectedDate, setSelectedDate] = useState<string | undefined>(
		undefined
	);
	const static_date = "2021-09-01";

	const availableDates = classAssistance.map((item) => item.date).sort();

	function firstDayAfterStaticDate() {
		const date = static_date;
		const index = availableDates.findIndex((item) => item >= date);
		return availableDates[index];
	}

	return (
		<div>
			<Select defaultValue={firstDayAfterStaticDate()} value={selectedDate}>
				<SelectTrigger className='w-[250px] bg-[#d9d9d9]'>
					<SelectValue
						placeholder={formatDateLong(firstDayAfterStaticDate())}
					/>
				</SelectTrigger>
				<SelectContent>
					{Array.from(new Set(availableDates)).map((date) => (
						<SelectItem key={date} value={date}>
							{formatDateLong(date)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
