import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

import { formatDateLong } from "@/app/utils/date";
import { Subjects, classAssistance } from "@/app/utils/consts";

export default function Page() {
	const totalStudents = Subjects[0].students.length;
	return (
		<div className='overflow-y-scroll overflow-hidden'>
			Scroll
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[250px]'>Fecha</TableHead>
						<TableHead>Asistencias</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{classAssistance.map((day, idx) => (
						<TableRow key={idx} className='hover:bg-slate-200'>
							<TableCell>{formatDateLong(day.date)}</TableCell>
							<TableCell className='flex'>
								<Progress
									className='mx-4'
									value={(day.assisted.length / totalStudents) * 100}
								/>
								<div className='text-nowrap'>
									{day.assisted.length} / {totalStudents}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
