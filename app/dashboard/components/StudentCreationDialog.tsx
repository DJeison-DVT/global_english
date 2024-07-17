import { createStudents } from "@/app/utils/api/students";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { StudentsCreationSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Users, X } from "react-feather";

export default function StudentCreationDialog({
	classId,
}: {
	classId: number;
}) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const form = useForm<z.infer<typeof StudentsCreationSchema>>({
		resolver: zodResolver(StudentsCreationSchema),
		defaultValues: {
			students: [{ name: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "students",
	});

	const onSubmit = async (data: z.infer<typeof StudentsCreationSchema>) => {
		setDisabled(true);

		try {
			await createStudents(classId, data);
		} catch (error) {
			toast({ title: "Error creando los estudiantes" });
			setDisabled(false);
			return;
		}

		toast({
			title: "Estudiantes creados correctamente",
		});

		setDisabled(false);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Users />
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Administrar Estudiantes</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<div className='max-h-[650px] min-w-96 overflow-y-auto flex flex-col gap-2 p-2'>
							{fields.map((field, index) => (
								<FormField
									key={field.id}
									control={form.control}
									name={`students.${index}.name`}
									render={({ field }) => (
										<FormItem>
											<div className='flex gap-1'>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
												<Button
													onClick={() => remove(index)}
													variant='destructive'
												>
													<X />
												</Button>
											</div>
										</FormItem>
									)}
								/>
							))}
						</div>
						<Button
							type='button'
							onClick={() => append({ name: "" })}
							className='bg-green-500'
						>
							Añadir Estudiante
						</Button>
						<Button disabled={disabled} type='submit'>
							Guardar Cambios
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
