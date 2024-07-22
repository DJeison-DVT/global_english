"use client";

import { Course } from "@prisma/client";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SupervisorAssignmentProps {
	courses: Course[];
}

export default function SupervisorAssignment({
	courses,
}: SupervisorAssignmentProps) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [supervisors, setSupervisors] = useState([]);

	const fetchSupervisors = async (courseId: number) => {
		try {
			const response = await fetch(
				`/api/courses/${courseId}/supervisors`
			);
			const data = await response.json();
			setSupervisors(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!courses.length) {
			return;
		}

		if (!selectedCourse) {
			setSelectedCourse(courses[0]);
			return;
		}

		// Fetch supervisors for selected course
		fetchSupervisors(selectedCourse.id);
	}, [selectedCourse, courses]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Asignar Supervisor</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>Adminsitrar supervisores</DialogHeader>
				{JSON.stringify(courses)}
				{JSON.stringify(supervisors)}
			</DialogContent>
		</Dialog>
	);
}
