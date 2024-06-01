"use client";

import { useEffect, useState } from "react";
import { Company, Course, User } from "@prisma/client";
import UserCreationDialog from "./UserCreationDialog";
import ClassCreationDialog from "./ClassCreationDialog";
import { getAllUsers } from "@/app/utils/api/users";
import { getAllCompanies } from "@/app/utils/api/companies";
import { getAllClasses } from "@/app/utils/api/classes";
import ClassCard from "./ClassCard";
import UserCard from "./UserCard";

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
		const classes = await getAllClasses();
		setClasses(classes);
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
			<div className='flex-1 flex'>
				<div className='flex flex-col flex-1'>
					<div className='flex-1 flex flex-wrap gap-4'>
						{classes.map((course) => (
							<ClassCard
								key={course.id}
								id={course.id}
								company={
									companies.find((company) => company.id === course.companyId)
										?.name || ""
								}
								name={course.name}
								startingDate={course.startingDate}
								endDate={course.endingDate}
							/>
						))}
					</div>
				</div>
				<div className='flex flex-col m-3'>
					<div className='flex flex-col flex-1'>
						<div className='flex-1 w-fit flex flex-col gap-3'>
							{users.map((user) => (
								<UserCard key={user.id} user={user} />
							))}
						</div>
						<div className='flex-1'>Companies</div>
					</div>
				</div>
			</div>
		</section>
	);
}
