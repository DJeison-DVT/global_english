// app/dashboard/classes/[slug]/layout.tsx
import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "./components/Sidebar";
import { Subjects } from "@/app/utils/consts";

interface DashboardLayoutProps {
	children: React.ReactNode;
	params: { slug: string };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
	params,
}) => {
	const classData = Subjects.find((subject) => subject.id === params.slug) || {
		company: "",
	};
	return (
		<div className='w-full bg-secondary overflow-hidden'>
			<div className='mx-24'>
				<Header
					titles={["Clases", classData.company]}
					links={["/dashboard", `/dashboard/classes/${params.slug}`]}
				/>
				<div className='flex'>
					<div className='flex-none'>
						<Sidebar classId={params.slug} />
					</div>
					<div className='flex-1 mx-24 mb-4'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
