import React from "react";
import Sidebar from "./components/Sidebar";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();
	if (!session) {
		redirect("/login");
	}
	return (
		<section className='min-h-screen max-h-screen max-w-screen flex '>
			<Sidebar />
			{children}
		</section>
	);
}
