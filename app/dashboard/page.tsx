import React from "react";
import Header from "../components/Header";

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./components/AdminDashboard";
import ProfessorDashboard from "./components/ProfessorDashboard";
import SupervisorDashboard from "./components/SupervisorDashboard";
import { Role } from "../types/types";

export default async function dashboard() {
	const session = await getSession();
	if (!session) redirect("/login");

	const roleComponents: Record<Role, JSX.Element> = {
		ADMIN: <AdminDashboard />,
		SUPERVISOR: <SupervisorDashboard user={session.username} />,
		USER: <ProfessorDashboard user={session.username} />,
	};

	return (
		<div className="flex-1 flex bg-secondary h-screen w-full">
			<div className="mx-24 flex-1 flex-col flex">
				<Header titles={["Clases"]} links={["/dashboard"]} />
				{roleComponents[session.role as Role]}
			</div>
		</div>
	);
}
