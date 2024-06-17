import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { formatDateLong, getDatesForWeekdays } from "@/app/utils/date";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Weekday } from "@prisma/client";

interface DayRowProps {
	day: Date;
	total: number;
	present: number;
}

const DayRow: React.FC<DayRowProps> = ({ day, total, present }) => {
	return (
		<TableRow className='hover:bg-slate-200'>
			<TableCell className='text-nowrap pr-0'>{formatDateLong(day)}</TableCell>
			<TableCell className='flex'>
				<Progress className='mx-14' value={(present / total) * 100} />
				<div className='text-nowrap '>
					{present} / {total}
				</div>
			</TableCell>
		</TableRow>
	);
};

interface DailyViewProps {
	startingDate: Date;
	endingDate: Date;
	weekdays: Weekday[];
}

export default function DailyView({
	startingDate,
	endingDate,
	weekdays,
}: DailyViewProps) {
	// all availables weekdays between startingDate and endingDate
	const start = new Date(startingDate);
	const end = new Date(endingDate);
	const dates = getDatesForWeekdays(start, end, weekdays);
	return (
		<ScrollArea className='w-full h-full '>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-auto'>Fecha</TableHead>
						<TableHead className='w-full text-center'>Asistencias</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{dates.map((day: Date, idx) => (
						<DayRow day={day} total={15} present={14} key={idx} />
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
}
