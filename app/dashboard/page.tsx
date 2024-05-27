import React from "react";
import ClassCard from "./components/ClassCard";
import Header from "../components/Header";

// TODO
// Change from dummy data to real data
import { Subjects } from "@/app/utils/consts";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";

function ProfessorDashboard() {
	return (
		<div className='flex flex-wrap gap-10 justify-start'>
			{Subjects.map((subject) => (
				<ClassCard key={subject.id} {...subject} />
			))}
		</div>
	);
}

export default async function dashboard() {
	const session = await getSession();
	if (!session) redirect("/login");

	return (
		<div className='flex-1 flex bg-secondary h-screen w-full'>
			<div className='mx-24 flex-1 flex-col flex'>
				<Header titles={["Clases"]} links={["/dashboard"]} />
				{session.role === "ADMIN" ? <AdminDashboard /> : <ProfessorDashboard />}
			</div>
		</div>
	);
}
