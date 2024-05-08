import React from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='min-h-screen max-h-screen max-w-screen flex '>
			<Sidebar />
			{children}
		</section>
	);
}
