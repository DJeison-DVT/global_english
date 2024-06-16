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
import { Subjects } from "@/app/utils/consts";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HoverButtonProps {
	children: React.ReactNode;
}

const HoverButton: React.FC<HoverButtonProps> = ({ children }) => (
	<button className='h-8 w-8 hover:bg-slate-200 flex items-center justify-center rounded-full transition-colors duration-150'>
		{children}
	</button>
);

export default function WeeklyView() {
	const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
	const [settingUp, setSettingUp] = useState(false);

	const weekdaySpanish = ["Lun", "Mar", "Mie", "Jue", "Vie"];

	function getWeekStart(currDate: Date) {
		const date = new Date(currDate);
		const day = date.getDay();

		const diff = date.getDate() - day + (day == 0 ? -6 : 1);
		return new Date(date.setDate(diff));
	}

	useEffect(() => {
		const today = new Date();
		setCurrentWeekStart(getWeekStart(today));
		setSettingUp(true);
	}, []);

	const weekdays = Subjects[0].weekdays;
	return (
		<div className='h-[calc(100%-40px)] '>
			<div className='flex items-center gap-3'>
				<Button variant='outline'>Esta semana</Button>
				<div className='flex gap-1'>
					<HoverButton>
						<ChevronLeft />
					</HoverButton>
					<HoverButton>
						<ChevronRight />
					</HoverButton>
				</div>
				{showMonths(currentWeekStart)}
			</div>
			{settingUp && (
				<ScrollArea className='h-full w-full'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-auto whitespace-nowrap'>
									Alumno
								</TableHead>
								{weekdays.map((day) => (
									<TableHead key={day} className='text-center'>
										{weekdaySpanish[day]} {currentWeekStart.getDate() + day}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{Subjects[0].students.map((student) => (
								<TableRow key={student.id}>
									<TableCell className='w-auto whitespace-nowrap'>
										{student.name} {student.surname}
									</TableCell>
									{weekdays.map((day) => (
										<TableCell
											key={day}
											className={`bg-green-500 border-2 border-secondary rounded-lg`}
										></TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			)}
		</div>
	);
}
