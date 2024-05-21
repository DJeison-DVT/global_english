import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { classAssistance } from "@/app/utils/consts";
import { formatDateLong } from "@/app/utils/date";
import { viewProps } from "../page";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DailyView({ totalStudents }: viewProps) {
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
					{classAssistance.map((day, idx) => (
						<TableRow key={idx} className='hover:bg-slate-200'>
							<TableCell className='text-nowrap pr-0'>
								{formatDateLong(day.date)}
							</TableCell>
							<TableCell className='flex'>
								<Progress
									className='mx-14'
									value={(day.assisted.length / totalStudents) * 100}
								/>
								<div className='text-nowrap '>
									{day.assisted.length} / {totalStudents}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
}
