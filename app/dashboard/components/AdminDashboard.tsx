"use client";

import { useEffect, useState } from "react";
import { URLBuilder } from "@/lib/utils";
import { User } from "@prisma/client";
import UserCreationDialog from "./UserCreationDialog";
import ClassCreationDialog from "./ClassCreationDialog";

export default function AdminDashboard() {
	const [users, setUsers] = useState<User[]>([]);
	useEffect(() => {
		fetch(URLBuilder("/api/users"))
			.then((res) => res.json())
			.then((data) => setUsers(data))
			.catch(console.error);
	}, []);

	return (
		<section className='flex-1 flex flex-col'>
			<div className='flex justify-end gap-3'>
				<UserCreationDialog />
				<ClassCreationDialog />
			</div>
			<div className='flex-1'></div>
		</section>
	);
}
