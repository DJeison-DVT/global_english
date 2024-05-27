import React from "react";
import ClassCard from "./components/ClassCard";
import Header from "../components/Header";

// TODO
// Change from dummy data to real data
import { Subjects } from "@/app/utils/consts";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfessorDashboard() {
	return (
		<div className='flex flex-wrap gap-10 justify-start'>
			{Subjects.map((subject) => (
				<ClassCard key={subject.id} {...subject} />
			))}
		</div>
	);
}

function AdminDashboard() {
	return (
		<Tabs defaultValue='classes' className='w-full h-full flex flex-col'>
			<TabsList>
				<TabsTrigger value='classes'>Clases</TabsTrigger>
				<TabsTrigger value='professors'>Profesores</TabsTrigger>
			</TabsList>
			<TabsContent value='classes'>
				<div className='flex flex-wrap gap-10 justify-start'>
					{Subjects.map((subject) => (
						<ClassCard key={subject.id} {...subject} />
					))}
				</div>
			</TabsContent>
			<TabsContent value='professors'></TabsContent>
		</Tabs>
	);
}

export default async function dashboard() {
	const session = await getSession();
	if (!session) redirect("/login");

	return (
		<div className='flex-1 bg-secondary'>
			<div className='mx-24'>
				<div>
					<Header titles={["Clases"]} links={["/dashboard"]} />
				</div>
				{session.role === "ADMIN" ? <AdminDashboard /> : <ProfessorDashboard />}
			</div>
		</div>
	);
}
