import Class from "@/app/types/Class";
import Sidebar from "./components/Sidebar";
import Header from "@/app/components/Header";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface ClassAssistance {
	date: string;
	assistants: number;
}

interface TotalClassAssistance extends ClassAssistance {
	total: number;
}

function formatDate(date: string) {
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

export default function Page({ params }: { params: { slug: string } }) {
	const classData: Class = {
		id: "1",
		company: "Company 1",
		startingDate: "2021-09-01",
		endDate: "2021-09-30",
		students: 10,
	};

	const classAssistance: ClassAssistance[] = [
		{
			date: "2021-08-31",
			assistants: 1,
		},
		{
			date: "2021-09-01",
			assistants: 2,
		},
		{
			date: "2021-09-02",
			assistants: 3,
		},
		{
			date: "2021-09-03",
			assistants: 4,
		},
		{
			date: "2021-09-04",
			assistants: 5,
		},
		{
			date: "2021-09-05",
			assistants: 6,
		},
		{
			date: "2021-09-01",
			assistants: 7,
		},
		{
			date: "2021-09-02",
			assistants: 8,
		},
		{
			date: "2021-09-03",
			assistants: 9,
		},
		{
			date: "2021-09-04",
			assistants: 10,
		},
	];

	return (
		<div className='flex-1 mx-24'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[250px]'>Fecha</TableHead>
						<TableHead>Asistencias</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{classAssistance.map((day, idx) => (
						<TableRow>
							<TableCell>{formatDate(day.date)}</TableCell>
							<TableCell className='flex'>
								<Progress
									className='mx-4'
									value={(day.assistants / classData.students) * 100}
								/>
								<div className='text-nowrap'>
									{day.assistants} / {classData.students}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
