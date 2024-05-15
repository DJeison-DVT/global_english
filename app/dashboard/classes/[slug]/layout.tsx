import React from "react";
import Header from "@/app/components/Header";
import Class from "@/app/types/Class";
import Sidebar from "./components/Sidebar";

interface DashboardLayoutProps {
	children: React.ReactNode;
	params: { slug: string };
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
	params,
}) => {
	const classData: Class = {
		id: "1",
		company: "Company 1",
		startingDate: "2021-09-01",
		endDate: "2021-09-30",
		students: 10,
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
					<div className='flex-1 mx-24'>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
