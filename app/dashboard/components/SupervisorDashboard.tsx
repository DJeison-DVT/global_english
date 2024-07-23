import { getClassBySupervisor } from "@/app/utils/api/classes";
import { Company, Course } from "@prisma/client";
import ClassCard from "./ClassCard";
import { getAllCompanies } from "@/app/utils/api/companies";

interface ProfessorDashboardProps {
	user: string;
}

export default async function SupervisorDashboard({
	user,
}: ProfessorDashboardProps) {
	const classes = await getClassBySupervisor(user);
	const companies = await getAllCompanies();
	return (
		<div className="flex flex-wrap gap-10 justify-start">
			{classes.map((course: Course) => (
				<ClassCard
					key={course.id}
					id={course.id}
					company={
						companies.find(
							(company: Company) =>
								company.id === course.companyId
						).name
					}
					name={course.name}
					startingDate={course.startingDate}
					endDate={course.endingDate}
					canTakeAttendance={false}
				/>
			))}
		</div>
	);
}
