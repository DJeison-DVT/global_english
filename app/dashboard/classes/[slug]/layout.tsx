import React from "react";
import Header from "@/app/components/Header";
import Sidebar from "./components/Sidebar";

interface DashboardLayoutProps {
	children: React.ReactNode;
	params: { slug: string };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	children,
	params,
}) => {
	return (
		<div className='w-full bg-secondary m-0 flex'>
			<div className='mx-24 h-screen w-full '>
				<Header
					titles={["Clases", params.slug]}
					links={["/dashboard", `/dashboard/classes/${params.slug}`]}
				/>
				<div className='h-[calc(100%-120px)] flex'>
					<div className='flex-none mr-14'>
						<Sidebar classId={params.slug} />
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
