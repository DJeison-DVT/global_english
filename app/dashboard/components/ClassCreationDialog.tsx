"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
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
import { CourseSchema, StudentSchema, CompanySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { formatDateToShort } from "@/app/utils/date";

const FormSchema = z
	.object({
		name: z.string().min(3).max(255),
		level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
		dateRange: z.object(
			{
				from: z.date(),
				to: z.date(),
			},
			{
				required_error: "Este campo es requerido",
			}
		),
		weekdays: z
			.array(
				z.enum([
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				])
			)
			.nonempty(),
	})
	.refine((data) => data.dateRange.to >= data.dateRange.from, {
		path: ["dateRange"],
		message: "La fecha de fin debe ser después de la fecha de inicio",
	});

export default function ClassCreationDialog() {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		defaultValues: {
			dateRange: {
				from: new Date(),
				to: addDays(new Date(), 7),
			},
		},
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
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
						className='flex flex-col gap-5'
					>
						<div className='flex'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombre</FormLabel>
										<Input {...field} />
										<FormMessage />
									</FormItem>
								)}
							/>
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
						</div>
						<div className='flex'>
							<FormField
								control={form.control}
								name='level'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
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
						</div>
						<div className='flex'>
							<FormField
								control={form.control}
								name='weekdays'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Días de la semana</FormLabel>
										<ToggleGroup type='multiple' onValueChange={field.onChange}>
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
							<div></div>
						</div>
						<Button type='submit'>Crear</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
