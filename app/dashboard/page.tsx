import React from "react";
import ClassCard from "./components/ClassCard";
import Header from "../components/Header";

function dashboard() {
	const scheduledClasses = [
		{
			id: "1",
			company: "Company 1",
			startingDate: "2021-01-01",
			endDate: "2021-01-31",
			students: 10,
		},
		{
			id: "2",
			company: "Company 2",
			startingDate: "2021-02-01",
			endDate: "2021-02-28",
			students: 15,
		},
		{
			id: "3",
			company: "Company 3",
			startingDate: "2021-03-01",
			endDate: "2021-03-31",
			students: 20,
		},
		{
			id: "4",
			company: "Company 4",
			startingDate: "2021-04-01",
			endDate: "2021-04-30",
			students: 25,
		},
		{
			id: "5",
			company: "Company 5",
			startingDate: "2021-05-01",
			endDate: "2021-05-31",
			students: 30,
		},
	];

	return (
		<div className='flex-1 bg-secondary'>
			<div className='mx-24'>
				<div>
					<Header titles={["Clases"]} links={["/dashboard"]} />
				</div>
				<div className='flex flex-wrap gap-10 justify-start'>
					{scheduledClasses.map((scheduledClass) => (
						<ClassCard
							id={scheduledClass.id}
							key={scheduledClass.company}
							company={scheduledClass.company}
							startingDate={scheduledClass.startingDate}
							endDate={scheduledClass.endDate}
							students={scheduledClass.students}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default dashboard;
