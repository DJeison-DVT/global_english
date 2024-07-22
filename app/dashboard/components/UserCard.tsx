"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@prisma/client";
import { X } from "react-feather";

interface UserCardProps {
	user: User;
	handleUserDelete: (id: number) => Promise<void>;
}

export default function UserCard({ user, handleUserDelete }: UserCardProps) {
	return (
		<div className='flex w-full bg-background rounded-md p-2 justify-between gap-3'>
			<div className='flex items-center'>
				{user.name} {user.surname}
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div
							className='hover:bg-slate-500/40 rounded-full p-1'
							onClick={() => handleUserDelete(user.id)}
						>
							<X />
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Eliminar</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
