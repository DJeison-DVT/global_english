"use client";

import { useEffect, useState } from "react";
import { formatDateLong } from "@/app/utils/date";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { classAssistance, Subjects } from "@/app/utils/consts";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/dist/server/api-utils";

const DayAssistance: React.FC = () => {
	const students = Subjects[0].students;
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Asistió</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students.map((student) => (
					<TableRow key={student.id} className='h-[55px]'>
						<TableCell className=''>
							{student.name} {student.surname}
						</TableCell>
						<TableCell className=''>
							<Checkbox />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default function Page() {
	const { toast } = useToast();
	const static_date = "2021-09-03";
	const [selectedDate, setSelectedDate] = useState<string | undefined>(
		undefined
	);
	const [availableDates, setAvailableDates] = useState<string[]>([]);

	useEffect(() => {
		let dates = classAssistance.map((day) => day.date);
		dates = Array.from(new Set(dates));
		setAvailableDates(Array.from(dates));

		setSelectedDate(firstDayAfterStaticDate(dates));
	}, []);

	function firstDayAfterStaticDate(dates: string[]) {
		let index = 0;
		if (dates.includes(static_date)) {
			index = dates.findIndex((item) => item === static_date);
		} else if (dates.some((item) => item > static_date)) {
			index = dates.findIndex((item) => item > static_date);
		}
		return dates[index];
	}

	return (
		<div className='flex flex-col w-full'>
			<Select
				value={selectedDate}
				onValueChange={(value) => {
					setSelectedDate(value);
					console.log(value);
				}}
			>
				<SelectTrigger className='w-[250px] bg-[#d9d9d9]'>
					<SelectValue
						placeholder={selectedDate ? selectedDate : "Select a date"}
					/>
				</SelectTrigger>
				<SelectContent>
					{availableDates.map((date) => (
						<SelectItem key={date} value={date}>
							{formatDateLong(date)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<ScrollArea className='w-full h-full my-4 '>
				<DayAssistance />
			</ScrollArea>
			<div className='flex justify-end'>
				<Button
					onClick={() => {
						toast({
							title: "Asistencia registrada",
							description: `La asistencia para el día ${formatDateLong(
								selectedDate as string
							)}`,
						});
					}}
				>
					Guardar
				</Button>
			</div>
		</div>
	);
}
