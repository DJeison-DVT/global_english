import { ReactNode } from "react";

import Header from "@/app/components/Header";
import Sidebar from "./components/Sidebar";
import { getClassById } from "@/app/utils/api/classes";

interface DashboardLayoutProps {
	children: ReactNode;
	params: { slug: string };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
	children,
	params,
}) => {
	const course = await getClassById(Number(params.slug));
	return (
		<div className='w-full bg-secondary m-0 flex'>
			<div className='mx-24 h-screen w-full '>
				<Header
					titles={["Clases", course.name]}
					links={["/dashboard", `/dashboard/classes/${course.name}`]}
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
