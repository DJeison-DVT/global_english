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
import { Student, Weekday } from "@prisma/client";
import { weekdayValues } from "@/app/types/types";

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
}

export default function WeeklyView({ students, weekdays }: WeeklyViewProps) {
	const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
	const [isLoading, setIsLoading] = useState(true);

	const weekdaySpanish = {
		MONDAY: "Lun",
		TUESDAY: "Mar",
		WEDNESDAY: "Mié",
		THURSDAY: "Jue",
		FRIDAY: "Vie",
		SATURDAY: "Sáb",
		SUNDAY: "Dom",
	};

	function getWeekStart(currDate: Date) {
		const date = new Date(currDate);
		const day = date.getDay();

		const diff = date.getDate() - day + (day == 0 ? -6 : 1);
		return new Date(date.setDate(diff));
	}

	const handleWeekChange = (direction: "next" | "prev") => {
		const newDate = new Date(currentWeekStart);
		if (direction === "next") {
			newDate.setDate(newDate.getDate() + 7);
		} else {
			newDate.setDate(newDate.getDate() - 7);
		}
		setCurrentWeekStart(newDate);
	};

	const currentWeek = () => {
		const today = new Date();
		setCurrentWeekStart(getWeekStart(today));
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return (
		<div className='h-[calc(100%-40px)] '>
			<div className='flex items-center gap-3 pb-2'>
				<Button onClick={currentWeek} variant='outline'>
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
										{weekdaySpanish[day]}{" "}
										{currentWeekStart.getDate() + weekdayValues[day]}
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
										{weekdays.map((day) => (
											<TableCell
												key={day}
												className={`bg-green-500 border-2 border-secondary rounded-lg flex-1`}
											></TableCell>
										))}
									</TableRow>
								))}
						</TableBody>
					</Table>
				</ScrollArea>
			</Loading>
		</div>
	);
}
