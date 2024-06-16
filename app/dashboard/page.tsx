import React from "react";
import Header from "../components/Header";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import ProfessorDashboard from "./components/ProfessorDashboard";

export default async function dashboard() {
	const session = await getSession();
	if (!session) redirect("/login");

	return (
		<div className='flex-1 flex bg-secondary h-screen w-full'>
			<div className='mx-24 flex-1 flex-col flex'>
				<Header titles={["Clases"]} links={["/dashboard"]} />
				{session.role === "ADMIN" ? (
					<AdminDashboard />
				) : (
					<ProfessorDashboard user={session.username} />
				)}
			</div>
		</div>
	);
}
