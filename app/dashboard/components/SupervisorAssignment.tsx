"use client";

import { Course, User } from "@prisma/client";
import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { getApiURL } from "@/lib/utils";

interface SupervisorAssignmentProps {
	courses: Course[];
}

const SupervisorsSchema = z.object({
	courseId: z.string().min(1),
	supervisors: z.array(z.string()),
});

export default function SupervisorAssignment({
	courses,
}: SupervisorAssignmentProps) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [supervisors, setSupervisors] = useState<User[] | null>(null);

	const form = useForm<z.infer<typeof SupervisorsSchema>>({
		resolver: zodResolver(SupervisorsSchema),
		defaultValues: {
			courseId: "",
			supervisors: [],
		},
	});

	const fetchSupervisors = async () => {
		try {
			const response = await fetch(
				getApiURL(`/api/users?role=SUPERVISOR`)
			);
			const data = await response.json();
			setSupervisors(data);
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmit = async (data: any) => {
		try {
			setDisabled(true);
			const response = await fetch(
				getApiURL(`/api/class/${data.courseId}/supervisors/`),
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (!response.ok) {
				throw new Error("Error assigning supervisors");
			}

			toast({
				title: "Success",
				description: "Supervisors assigned successfully",
			});
			setOpen(false);
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "Failed to assign supervisors",
			});
		} finally {
			setDisabled(false);
		}
	};

	useEffect(() => {
		if (!supervisors) {
			fetchSupervisors();
		}
	}, [courses]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Asignar Supervisor</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md min-h-96 flex flex-col h-fit ">
				<DialogHeader>
					<DialogTitle>Adminsitrar supervisores</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 flex flex-col h-full flex-1"
					>
						<FormField
							control={form.control}
							name="courseId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Clase</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											value={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Clase" />
											</SelectTrigger>
											<SelectContent>
												{courses.map((course) => (
													<SelectItem
														key={course.id}
														value={String(
															course.id
														)}
													>
														{course.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage>
										{
											form.formState.errors.courseId
												?.message
										}
									</FormMessage>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="supervisors"
							render={() => (
								<FormItem className="w-full flex-1">
									<FormLabel className="text-base">
										Supervisores Disponibles
									</FormLabel>
									{supervisors &&
										supervisors.map((supervisor) => (
											<FormField
												key={supervisor.id}
												control={form.control}
												name="supervisors"
												render={({ field }) => {
													return (
														<FormItem
															key={supervisor.id}
															className="flex flex-row items-start space-x-3 space-y-0"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(
																		String(
																			supervisor.id
																		)
																	)}
																	onCheckedChange={(
																		checked
																	) => {
																		return checked
																			? field.onChange(
																					[
																						...field.value,
																						String(
																							supervisor.id
																						),
																					]
																			  )
																			: field.onChange(
																					field.value?.filter(
																						(
																							value
																						) =>
																							value !==
																							String(
																								supervisor.id
																							)
																					)
																			  );
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{
																	supervisor.name
																}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
									<FormMessage>
										{
											form.formState.errors.supervisors
												?.message
										}
									</FormMessage>
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={disabled}>
							Asignar Supervisores
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
