"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { CourseSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { addDays, format, set } from "date-fns";
import { formatDateToShort } from "@/app/utils/date";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Company, User } from "@prisma/client";
import UserCreationDialog from "./UserCreationDialog";
import CompanyCreationDialog from "./CompanyCreationDialog";

interface ClassCreationDialogProps {
	users: User[];
	companies: Company[];
	onClassCreated: () => void;
	onUserCreated: () => void;
	onCompanyCreated: () => void;
}

export default function ClassCreationDialog({
	users,
	companies,
	onClassCreated,
	onUserCreated,
	onCompanyCreated,
}: ClassCreationDialogProps) {
	const [disabled, setDisabled] = useState(false);
	const [openClass, setClassOpen] = useState(false);
	const [professors, setProfessors] = useState<User[]>([]);

	function userFullname(user: User) {
		return `${user.name} ${user.surname}`;
	}

	const form = useForm<z.infer<typeof CourseSchema>>({
		defaultValues: {
			dateRange: {
				from: new Date(),
				to: addDays(new Date(), 7),
			},
		},
		resolver: zodResolver(CourseSchema),
	});

	function onSubmit(data: z.infer<typeof CourseSchema>) {
		setDisabled(true);
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});

		onClassCreated();
		setDisabled(false);
		form.reset({
			dateRange: {
				from: new Date(),
				to: addDays(new Date(), 7),
			},
		});
		setClassOpen(false);
	}

	useEffect(() => {
		const professors = users.filter((user) => user.role === "USER");
		setProfessors(professors);
	}, [users]);

	return (
		<Dialog open={openClass} onOpenChange={setClassOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Crear Clase</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[600px]'>
				<DialogHeader>
					<DialogTitle>Crea una nueva clase </DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid grid-cols-2 gap-5'
					>
						<FormField
							control={form.control}
							name='name'
							defaultValue=''
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de la clase</FormLabel>
									<Input {...field} />
									<FormMessage />
								</FormItem>
							)}
						/>
						{professors.length > 0 && (
							<FormField
								control={form.control}
								name='professorId'
								render={({ field }) => (
									<FormItem className='flex flex-col mt-2'>
										<FormLabel>Profesor</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={`w-full justify-between
														${!field.value && "text-muted-foreground"}`}
													>
														<div className='flex justify-between w-full'>
															{field.value
																? userFullname(
																		professors.find(
																			(prof) => prof.id === field.value
																		)!
																  )
																: "Selecciona un profesor"}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</div>
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-[200px] p-0'>
												<Command>
													<CommandInput placeholder='Buscar profesor...' />
													<CommandList>
														<CommandEmpty>
															<UserCreationDialog
																onUserCreated={onUserCreated}
															/>
														</CommandEmpty>
														<CommandGroup>
															{professors.map((prof) => (
																<CommandItem
																	value={userFullname(prof)}
																	key={prof.id}
																	onSelect={() => {
																		form.setValue("professorId", prof.id);
																	}}
																>
																	<Check
																		className={`mr-2 h-4 w-4
																	${prof.id === field.value ? "opacity-100" : "opacity-0"}`}
																	/>
																	{userFullname(prof)}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='dateRange'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Periodo</FormLabel>
									<Popover modal={true}>
										<PopoverTrigger asChild>
											<Button
												id='date'
												variant='outline'
												className={`w-full justify-start text-left font-normal
											${!field.value.from && "text-muted-foreground"}`}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{field.value.from ? (
													field.value.to ? (
														<>
															{formatDateToShort(field.value.from)} -{" "}
															{formatDateToShort(field.value.to)}
														</>
													) : (
														format(field.value.from, "LLL dd, y")
													)
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0' align='center'>
											<Calendar
												initialFocus
												mode='range'
												defaultMonth={field.value.from}
												selected={{
													from: field.value.from!,
													to: field.value.to,
												}}
												onSelect={field.onChange}
												numberOfMonths={2}
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						{companies.length > 0 && (
							<FormField
								control={form.control}
								name='companyId'
								render={({ field }) => (
									<FormItem className='flex flex-col'>
										<FormLabel>Compañía</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={`w-full justify-between",
														${!field.value && "text-muted-foreground"}`}
													>
														<div className='flex justify-between w-full'>
															{field.value
																? companies.find(
																		(corp) => corp.id === field.value
																  )?.name
																: "Selecciona una compañía"}
															<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
														</div>
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-[200px] p-0'>
												<Command>
													<CommandInput placeholder='Buscar compañía...' />
													<CommandList>
														<CommandEmpty>
															<CompanyCreationDialog
																onCompanyCreated={onCompanyCreated}
															/>
														</CommandEmpty>
														<CommandGroup>
															{companies.map((corp) => (
																<CommandItem
																	value={corp.name}
																	key={corp.id}
																	onSelect={() => {
																		form.setValue("companyId", corp.id);
																	}}
																>
																	<Check
																		className={`mr-2 h-4 w-4
																	${corp.id === field.value ? "opacity-100" : "opacity-0"}`}
																	/>
																	{corp.name}
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<FormField
							control={form.control}
							name='weekdays'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Días de la semana</FormLabel>
									<ToggleGroup
										size={"sm"}
										type='multiple'
										onValueChange={field.onChange}
									>
										<ToggleGroupItem value='Monday'>L</ToggleGroupItem>
										<ToggleGroupItem value='Tuesday'>M</ToggleGroupItem>
										<ToggleGroupItem value='Wednesday'>X</ToggleGroupItem>
										<ToggleGroupItem value='Thursday'>J</ToggleGroupItem>
										<ToggleGroupItem value='Friday'>V</ToggleGroupItem>
										<ToggleGroupItem value='Saturday'>S</ToggleGroupItem>
										<ToggleGroupItem value='Sunday'>D</ToggleGroupItem>
									</ToggleGroup>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='level'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nivel</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Selecciona el nivel' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='BEGINNER'>Principiante</SelectItem>
											<SelectItem value='INTERMEDIATE'>Intermedio</SelectItem>
											<SelectItem value='ADVANCED'>Avanzado</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={disabled} type='submit'>
							Crear
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
