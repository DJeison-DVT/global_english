import Link from "next/link";
import MenuItem from "@/app/dashboard/components/MenuItem";
import { Tool, UserCheck, Users } from "react-feather";
import { getSession } from "@/lib/auth";

interface SidebarProps {
	classId: string;
}

export default async function Sidebar({ classId }: SidebarProps) {
	const token = await getSession();
	if (!token) return null;

	return (
		<div className='flex flex-col w-48 gap-3'>
			<Link href={`/dashboard/classes/${classId}`}>
				<MenuItem title='Asistencias' icon={Users} />
			</Link>
			<Link href={`/dashboard/classes/${classId}/tomar-asistencia`}>
				<MenuItem title='Tomar Asistencia' icon={UserCheck} />
			</Link>
			{token.role === "ADMIN" && (
				<Link href={`/dashboard/classes/${classId}/settings`}>
					<MenuItem title='Administrar Clase' icon={Tool} />
				</Link>
			)}
		</div>
	);
}
