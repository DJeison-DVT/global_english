import MenuItem from "@/app/dashboard/components/MenuItem";
import { Tool, UserCheck, Users } from "react-feather";

export default function Sidebar() {
	return (
		<div className='flex flex-col w-48'>
			<MenuItem title='Asistencias' icon={Users} />
			<MenuItem title='Tomar Asistencia' icon={UserCheck} />
			<MenuItem title='Administrar Clase' icon={Tool} />
		</div>
	);
}
