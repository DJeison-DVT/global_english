import Link from "next/link";
import MenuItem from "@/app/dashboard/components/MenuItem";
import { Tool, UserCheck, Users } from "react-feather";

interface SidebarProps {
	classId: string;
}

export default function Sidebar({ classId }: SidebarProps) {
	return (
		<div className='flex flex-col w-48'>
			<Link href={`/dashboard/classes/${classId}`}>
				<MenuItem title='Asistencias' icon={Users} />
			</Link>
			<Link href={`/dashboard/classes/${classId}/tomar-asistencia`}>
				<MenuItem title='Tomar Asistencia' icon={UserCheck} />
			</Link>
			<Link href={`/dashboard/classes/${classId}`}>
				<MenuItem title='Administrar Clase' icon={Tool} />
			</Link>
		</div>
	);
}
