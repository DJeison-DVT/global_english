import React from "react";
import { MoreVertical, UserCheck } from "react-feather";
import Tooltipped from "@/app/components/Tooltipped";
import Breadcrumb from "./components/Breadcrumb";

interface Class {
	company: string;
	startingDate: string;
	endDate: string;
}

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date: string) {
	const dateObj = new Date(date);

	return capitalize(
		dateObj
			.toLocaleDateString("es-ES", { month: "short", year: "numeric" })
			.replace(".", "")
	);
}

const ClassCard: React.FC<Class> = ({ company, startingDate, endDate }) => {
	return (
		<div className='w-80'>
			<div className='hover:cursor-pointer text-2xl flex bg-white items-end h-20 rounded-t-lg'>
				<div className='m-3'>{company}</div>
			</div>
			<div className='flex p-4 justify-between items-center bg-primary text-white rounded-b-lg'>
				<div className='hover:cursor-pointer'>
					{formatDate(startingDate)} - {formatDate(endDate)}
				</div>
				<div className='flex gap-2 '>
					<Tooltipped tooltip='Tomar Asistencia'>
						<UserCheck />
					</Tooltipped>
					<Tooltipped tooltip='Opciones'>
						<MoreVertical />
					</Tooltipped>
				</div>
			</div>
		</div>
	);
};

function dashboard() {
	const scheduledClasses = [
		{
			company: "Company 1",
			startingDate: "2021-01-01",
			endDate: "2021-01-31",
		},
		{
			company: "Company 2",
			startingDate: "2021-02-01",
			endDate: "2021-02-28",
		},
		{
			company: "Company 3",
			startingDate: "2021-03-01",
			endDate: "2021-03-31",
		},
		{
			company: "Company 4",
			startingDate: "2021-04-01",
			endDate: "2021-04-30",
		},
		{
			company: "Company 5",
			startingDate: "2021-05-01",
			endDate: "2021-05-31",
		},
	];

	return (
		<div className='flex-1 bg-secondary'>
			<div className='mx-24'>
				<Breadcrumb breadcrumbs={["Clases"]} />
				<div className='flex flex-wrap gap-10 justify-start'>
					{scheduledClasses.map((scheduledClass) => (
						<ClassCard
							key={scheduledClass.company}
							company={scheduledClass.company}
							startingDate={scheduledClass.startingDate}
							endDate={scheduledClass.endDate}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default dashboard;
