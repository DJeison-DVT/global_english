import Class from "@/app/types/Class";
import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "./components/Sidebar";

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

const DayAssistance = ({ date, assistants, total }: TotalClassAssistance) => {
	return (
		<tr className='odd:bg-primary/40 even:bg-white p-2 rounded-md overflow-hidden '>
			<td>{formatDate(date)}</td>
			<td>
				<meter
					min={0}
					max={total}
					value={assistants}
					low={6}
					high={8}
					optimum={9}
				></meter>
			</td>
			<td>
				{assistants} / {total}
			</td>
		</tr>
	);
};

export default function Page({ params }: { params: { slug: string } }) {
	const classData: Class = {
		id: "1",
		company: "Company",
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
		<div className='w-full bg-secondary overflow-hidden'>
			<div className='mx-24'>
				<Breadcrumb breadcrumbs={["Clases", params.slug]} />
				<div className='flex'>
					<div className='flex-none'>
						<Sidebar />
					</div>
					<div className='flex-1 '>
						<table className='border-spacing-y-2 border-separate '>
							<thead>
								<tr>
									<th>Fecha</th>
									<th colSpan={2}>Asistencia</th>
								</tr>
							</thead>
							<tbody>
								{classAssistance.map((day, idx) => (
									<DayAssistance
										key={idx}
										{...day}
										total={classData.students}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
