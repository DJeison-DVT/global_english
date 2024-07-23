"use client";

import { useRouter } from "next/navigation";
import { UserCheck } from "react-feather";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { formatDate } from "@/app/utils/date";
import StudentCreationDialog from "./StudentCreationDialog";
import DeletionDialog from "./DeletionDialog";

interface ClassCardProps {
	id: number;
	company: string;
	name: string;
	startingDate: Date;
	endDate: Date;
	handleDelete?: (id: string) => Promise<void> | null;
	canTakeAttendance?: boolean;
	admin?: boolean;
}

const ClassCard: React.FC<ClassCardProps> = ({
	id,
	company,
	name,
	startingDate,
	endDate,
	handleDelete = () => null,
	admin = false,
	canTakeAttendance = true,
}) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/dashboard/classes/${id}`);
	};
	const start = new Date(startingDate);
	const end = new Date(endDate);

	return (
		<div className="w-80 h-fit transition-opacity duration-500 ease-in-out opacity-100">
			<div
				onClick={handleClick}
				className="hover:cursor-pointer text-2xl flex bg-white items-end h-20 rounded-t-lg"
			>
				<div className="mx-3 my-1">
					<div className="">{name}</div>
					<div className="text-sm">{company}</div>
				</div>
			</div>
			<div className="flex p-3 justify-between items-center bg-primary text-white rounded-b-lg">
				<div onClick={handleClick} className="hover:cursor-pointer">
					{formatDate(start.toISOString())} -{" "}
					{formatDate(end.toISOString())}
				</div>
				<div className="flex">
					{canTakeAttendance && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Link
										href={`dashboard/classes/${id}/tomar-asistencia`}
									>
										<div className="flex justify-center items-center hover:bg-slate-600 p-1 rounded-full">
											<UserCheck />
										</div>
									</Link>
								</TooltipTrigger>
								<TooltipContent>
									<p>Tomar Asistencia</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{admin && (
						<>
							<div className="flex justify-center items-center hover:bg-slate-600 p-1 rounded-full">
								<StudentCreationDialog classId={id} />
							</div>
							<div className="flex justify-center items-center hover:bg-slate-600 p-1 rounded-full">
								<DeletionDialog
									id={id}
									title={name}
									handleDelete={handleDelete}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ClassCard;
