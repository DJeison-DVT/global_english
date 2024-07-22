"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@prisma/client";
import { X } from "react-feather";
import DeletionDialog from "./DeletionDialog";

interface UserCardProps {
	user: User;
	handleUserDelete: (id: number) => Promise<void>;
}

export default function UserCard({ user, handleUserDelete }: UserCardProps) {
	return (
		<div className="flex w-full bg-background rounded-md p-2 justify-between gap-3">
			<div className="flex items-center">
				{user.name} {user.surname}
			</div>
			<DeletionDialog
				id={user.id}
				title={`${user.username}`}
				handleDelete={() => handleUserDelete(user.id)}
			/>
		</div>
	);
}
