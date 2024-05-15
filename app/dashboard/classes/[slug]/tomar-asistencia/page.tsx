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

interface UserAssistance {
	id: string;
	name: string;
	lastName: string;
	assistance: boolean;
	date: string;
	class_id: string;
}

export default function Page() {
	const [selectedDate, setSelectedDate] = useState<string | undefined>(
		undefined
	);
	const static_date = "2021-09-01";

	const classAssistance: UserAssistance[] = [
		{
			id: "1",
			name: "John",
			lastName: "Doe",
			assistance: true,
			date: "2021-08-31",
			class_id: "1",
		},
		{
			id: "2",
			name: "Jane",
			lastName: "Doe",
			assistance: false,
			date: "2021-08-31",
			class_id: "1",
		},
		{
			id: "3",
			name: "John",
			lastName: "Smith",
			assistance: true,
			date: "2021-08-31",
			class_id: "1",
		},
		{
			id: "4",
			name: "Jane",
			lastName: "Smith",
			assistance: false,
			date: "2021-08-31",
			class_id: "1",
		},
		{
			id: "5",
			name: "John",
			lastName: "Doe",
			assistance: true,
			date: "2021-09-01",
			class_id: "1",
		},
		{
			id: "6",
			name: "Jane",
			lastName: "Doe",
			assistance: false,
			date: "2021-09-01",
			class_id: "1",
		},
		{
			id: "7",
			name: "John",
			lastName: "Smith",
			assistance: true,
			date: "2021-09-01",
			class_id: "1",
		},
		{
			id: "8",
			name: "Jane",
			lastName: "Smith",
			assistance: false,
			date: "2021-09-01",
			class_id: "1",
		},
		{
			id: "9",
			name: "John",
			lastName: "Doe",
			assistance: true,
			date: "2021-09-02",
			class_id: "1",
		},
		{
			id: "10",
			name: "Jane",
			lastName: "Doe",
			assistance: false,
			date: "2021-09-02",
			class_id: "1",
		},
		{
			id: "11",
			name: "John",
			lastName: "Smith",
			assistance: true,
			date: "2021-09-02",
			class_id: "1",
		},
		{
			id: "12",
			name: "Jane",
			lastName: "Smith",
			assistance: false,
			date: "2021-09-02",
			class_id: "1",
		},
		{
			id: "13",
			name: "John",
			lastName: "Doe",
			assistance: true,
			date: "2021-09-03",
			class_id: "1",
		},
		{
			id: "14",
			name: "Jane",
			lastName: "Doe",
			assistance: false,
			date: "2021-09-03",
			class_id: "1",
		},
		{
			id: "15",
			name: "John",
			lastName: "Smith",
			assistance: true,
			date: "2021-09-03",
			class_id: "1",
		},
		{
			id: "16",
			name: "Jane",
			lastName: "Smith",
			assistance: false,
			date: "2021-09-03",
			class_id: "1",
		},
	];
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
