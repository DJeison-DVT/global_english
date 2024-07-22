"use client";

import { useEffect, useState } from "react";
import { Company, Course, User } from "@prisma/client";
import UserCreationDialog from "./UserCreationDialog";
import ClassCreationDialog from "./ClassCreationDialog";
import { getAllUsers, deleteUser } from "@/app/utils/api/users";
import { getAllCompanies, deleteCompany } from "@/app/utils/api/companies";
import { deleteClass, getAllClasses } from "@/app/utils/api/classes";
import ClassCard from "./ClassCard";
import UserCard from "./UserCard";
import CompanyCard from "./CompanyCard";
import { Skeleton } from "@/components/ui/skeleton";
import SupervisorAssignment from "./SupervisorAssignment";

interface SkeletonProps {
	quantity: number;
}

const ClassSkeleton = ({ quantity }: SkeletonProps) => {
	return Array.from({ length: quantity }).map((_, index) => (
		<Skeleton
			key={index}
			className="rounded-lg h-[136px] bg-primary/25 w-80"
		/>
	));
};

const EntitySkeleton = ({ quantity }: SkeletonProps) => {
	return Array.from({ length: quantity }).map((_, index) => (
		<Skeleton
			key={index}
			className="rounded-lg h-[48px] bg-primary/25 w-[226px]"
		/>
	));
};

export default function AdminDashboard() {
	const [users, setUsers] = useState<User[]>([]);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [classes, setClasses] = useState<Course[]>([]);
	const [loadingClasses, setLoadingClasses] = useState(true);
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loadingCompanies, setLoadingCompanies] = useState(true);

	const fetchUsers = async () => {
		const users = await getAllUsers();
		setUsers(users);
		setLoadingUsers(false);
	};

	const fetchCompanies = async () => {
		const companies = await getAllCompanies();
		setCompanies(companies);
		setLoadingCompanies(false);
	};

	const fetchClasses = async () => {
		const classes = await getAllClasses();
		setClasses(classes);
		setLoadingClasses(false);
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

	const handleClassDelete = async (id: string) => {
		await deleteClass(id);
		fetchClasses();
	};

	const handleCompanyDelete = async (id: string) => {
		await deleteCompany(id);
		fetchCompanies();
	};

	const handleUserDelete = async (id: number) => {
		await deleteUser(id);
		fetchUsers();
	};

	useEffect(() => {
		fetchUsers();
		fetchClasses();
		fetchCompanies();
	}, []);

	return (
		<section className="flex-1 flex flex-row-reverse overflow-hidden">
			<div className="flex flex-col w-fit">
				<div className="flex justify-end gap-3">
					<UserCreationDialog onUserCreated={handleUserCreation} />
					<ClassCreationDialog
						users={users}
						companies={companies}
						onClassCreated={handleClassCreation}
						onCompanyCreated={handleCompanyCreation}
						onUserCreated={handleUserCreation}
					/>
					<SupervisorAssignment courses={classes} />
				</div>
				<div className="flex flex-col m-3 flex-1">
					<div className="flex flex-col flex-1">
						<div className="flex-1 w-full flex flex-col gap-3">
							<div className="text-xl">Usuarios</div>
							{loadingUsers ? (
								<EntitySkeleton quantity={4} />
							) : (
								users.map((user) => (
									<UserCard
										handleUserDelete={handleUserDelete}
										key={user.id}
										user={user}
									/>
								))
							)}
						</div>
						<div className="flex-1 w-full flex flex-col gap-3">
							<div className="text-xl">Empresas</div>
							{loadingCompanies ? (
								<EntitySkeleton quantity={2} />
							) : (
								companies.map((company) => (
									<CompanyCard
										key={company.id}
										company={company}
										handleCompanyDelete={
											handleCompanyDelete
										}
									/>
								))
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="flex-1 ">
				<div className="h-fit flex flex-wrap gap-3">
					{!loadingClasses ? (
						classes.map((course) => (
							<ClassCard
								key={course.id}
								id={course.id}
								company={
									companies.find(
										(company) =>
											company.id === course.companyId
									)?.name || ""
								}
								name={course.name}
								startingDate={course.startingDate}
								endDate={course.endingDate}
								handleDelete={handleClassDelete}
								admin
							/>
						))
					) : (
						<ClassSkeleton quantity={4} />
					)}
				</div>
			</div>
		</section>
	);
}
