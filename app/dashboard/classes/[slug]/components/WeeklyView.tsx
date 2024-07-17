"use client";

import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { showMonths } from "@/app/utils/date";
import { ChevronLeft, ChevronRight } from "react-feather";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loading from "@/app/components/Loading";
import { Student, Weekday, Attended, Course } from "@prisma/client";
import { weekdayValues } from "@/app/types/types";
import { getAssistanceByClass } from "@/app/utils/api/assistance";

interface HoverButtonProps {
	children: React.ReactNode;
}

const HoverButton: React.FC<HoverButtonProps> = ({ children }) => (
	<button className='h-8 w-8 hover:bg-slate-200 flex items-center justify-center rounded-full transition-colors duration-150'>
		{children}
	</button>
);

interface WeeklyViewProps {
	students: Student[];
	weekdays: Weekday[];
	course: Course;
	params: { slug: string };
}

export default function WeeklyView({
	students,
	weekdays,
	course,
	params,
}: WeeklyViewProps) {
	const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
	const [isLoading, setIsLoading] = useState(true);
	const [assistance, setAssistance] = useState<Attended[]>([]);
	const startingDate = new Date(course.startingDate);
	const endingDate = new Date(course.endingDate);

	const weekdaySpanish = {
		MONDAY: "Lun",
		TUESDAY: "Mar",
		WEDNESDAY: "Mié",
		THURSDAY: "Jue",
		FRIDAY: "Vie",
		SATURDAY: "Sáb",
		SUNDAY: "Dom",
	};

	const fetchAssistance = async () => {
		const assistance = await getAssistanceByClass(params.slug);
		setAssistance(assistance);
		setIsLoading(false);
	};

	function getOffsetDate(day: Weekday): Date {
		const startOfWeek = getWeekStart(currentWeekStart);
		const offsetDate = new Date(startOfWeek);
		offsetDate.setDate(startOfWeek.getDate() + weekdayValues[day]);
		offsetDate.setHours(0, 0, 0, 0); // Set to start of the day
		return offsetDate;
	}

	function compareDateStrings(date: Date, weekday: Weekday): boolean {
		const dateString1 = date.toISOString();
		const dateString2 = getOffsetDate(weekday).toISOString();

		const datePart1 = dateString1.split("T")[0];
		const datePart2 = dateString2.split("T")[0];
		return datePart1 === datePart2;
	}

	function getWeekStart(date: Date): Date {
		const currentDate = new Date(date);
		const dayOfWeek = currentDate.getDay();
		const start =
			currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
		currentDate.setDate(start);
		currentDate.setHours(0, 0, 0, 0); // Set to start of the day
		return currentDate;
	}

	const handleWeekChange = (direction: "next" | "prev") => {
		let newDate = new Date(currentWeekStart);
		if (direction === "next") {
			newDate.setDate(newDate.getDate() + 7);
		} else {
			newDate.setDate(newDate.getDate() - 7);
		}

		const startWeekDate = getWeekStart(new Date(startingDate));
		const endWeekDate = getWeekStart(new Date(endingDate));
		endWeekDate.setDate(endWeekDate.getDate() + 6); // End of the week containing the course end date

		const minDate = new Date(startWeekDate);
		minDate.setDate(minDate.getDate()); // One week before the course start date

		const maxDate = new Date(endWeekDate);
		maxDate.setDate(maxDate.getDate()); // One week after the course end date

		if (newDate < minDate) {
			newDate = minDate;
		} else if (newDate > maxDate) {
			newDate = maxDate;
		}

		currentWeek(newDate);
	};

	const currentWeek = (today: Date = new Date()) => {
		setCurrentWeekStart(getWeekStart(today));
	};

	useEffect(() => {
		fetchAssistance();
	}, []);

	return (
		<div className='h-[calc(100%-40px)] '>
			<div className='flex items-center gap-3 pb-2'>
				<Button onClick={() => currentWeek()} variant='outline'>
					Esta semana
				</Button>
				<div className='flex gap-1'>
					<div onClick={() => handleWeekChange("prev")}>
						<HoverButton>
							<ChevronLeft />
						</HoverButton>
					</div>
					<div onClick={() => handleWeekChange("next")}>
						<HoverButton>
							<ChevronRight />
						</HoverButton>
					</div>
				</div>
				{showMonths(currentWeekStart)}
			</div>
			<Loading active={isLoading}>
				<ScrollArea className='h-full w-full'>
					<Table className='block w-full'>
						<TableHeader className='flex w-full'>
							<TableRow className='flex flex-1 '>
								<TableHead className='w-52 whitespace-nowrap flex items-center'>
									Alumno
								</TableHead>
								{weekdays.map((day) => (
									<TableHead
										key={day}
										className='text-center flex-1 flex items-center justify-center'
									>
										{weekdaySpanish[day]} {getOffsetDate(day).getDate()}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody className='flex flex-col w-full'>
							{students &&
								students.map((student: Student) => (
									<TableRow key={student.id} className='flex flex-1 '>
										<TableCell className='w-52 whitespace-nowrap'>
											{student.fullname}
										</TableCell>
										{weekdays.map((day) => {
											const attended = assistance.some(
												(record) =>
													Number(record.studentId) === student.id &&
													compareDateStrings(new Date(record.date), day)
											);
											return (
												<TableCell
													key={day}
													className={`border-2 border-primary rounded-lg flex-1 ${
														attended ? "bg-green-500" : "bg-red-500"
													}`}
												></TableCell>
											);
										})}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</ScrollArea>
			</Loading>
		</div>
	);
}
