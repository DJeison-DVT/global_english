"use client";

import { useRouter } from "next/navigation";
import { Subject } from "@/app/types/types";
import { MoreVertical, UserCheck } from "react-feather";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { formatDate } from "@/app/utils/date";

interface ClassCardProps {
	id: number;
	company: string;
	name: string;
	startingDate: Date;
	endDate: Date;
}

const ClassCard: React.FC<ClassCardProps> = ({
	id,
	company,
	name,
	startingDate,
	endDate,
}) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/dashboard/classes/${id}`);
	};
	const start = new Date(startingDate);
	const end = new Date(endDate);
	return (
		<div className='w-80 h-fit transition-opacity duration-500 ease-in-out opacity-100'>
			<div
				onClick={handleClick}
				className='hover:cursor-pointer text-2xl flex bg-white items-end h-20 rounded-t-lg'
			>
				<div className='mx-3 my-1'>
					<div className=''>{name}</div>
					<div className='text-sm'>{company}</div>
				</div>
			</div>
			<div className='flex p-3 justify-between items-center bg-primary text-white rounded-b-lg'>
				<div onClick={handleClick} className='hover:cursor-pointer'>
					{formatDate(start.toISOString())} - {formatDate(end.toISOString())}
				</div>
				<div className='flex gap-2 '>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Link href={`dashboard/classes/${id}/tomar-asistencia`}>
									<div className='flex justify-center items-center hover:bg-slate-600 p-1 rounded-full'>
										<UserCheck />
									</div>
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>Tomar Asistencia</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className='hover:bg-slate-600 p-1 rounded-full'>
									<MoreVertical />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Opciones</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
