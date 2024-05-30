"use client";

import { useEffect, useState } from "react";
import { Company, Course, User } from "@prisma/client";
import UserCreationDialog from "./UserCreationDialog";
import ClassCreationDialog from "./ClassCreationDialog";
import { getAllUsers } from "@/app/utils/api/users";
import { getAllCompanies } from "@/app/utils/api/companies";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [classes, setClasses] = useState<Course[]>([]);
	const [companies, setCompanies] = useState<Company[]>([]);

	const fetchUsers = async () => {
		const users = await getAllUsers();
		setUsers(users);
	};

	const fetchCompanies = async () => {
		const companies = await getAllCompanies();
		setCompanies(companies);
	};

	const fetchClasses = async () => {
		return;
	};

	const handleUserCreation = async () => {
		fetchUsers();
	};

	const handleClassCreation = async () => {
		fetchClasses();
	};
	const handleCompanyCreation = async () => {
		fetchCompanies();
	};

	useEffect(() => {
		fetchUsers();
		fetchClasses();
		fetchCompanies();
	}, []);

	return (
		<section className='flex-1 flex flex-col'>
			<div className='flex justify-end gap-3'>
				<UserCreationDialog onUserCreated={handleUserCreation} />
				<ClassCreationDialog
					users={users}
					companies={companies}
					onClassCreated={handleClassCreation}
					onCompanyCreated={handleCompanyCreation}
					onUserCreated={handleUserCreation}
				/>
			</div>
			<div className='flex-1'>
				{users.map((user) => (
					<div key={user.id}>
						{user.name} - {user.role}
					</div>
				))}
				<Separator />
				{companies.map((company) => (
					<div key={company.id}>{company.name}</div>
				))}
				<Separator />
				{classes.map((cls) => (
					<div key={cls.id}>{cls.name}</div>
				))}
			</div>
		</section>
	);
}
