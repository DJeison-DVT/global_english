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
import { toast } from "@/components/ui/use-toast";
import { register } from "@/lib/auth";
import { UserCreationSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UserCreationDialogProps {
	onUserCreated: () => void;
}

export default function UserCreationDialog({
	onUserCreated,
}: UserCreationDialogProps) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const form = useForm<z.infer<typeof UserCreationSchema>>({
		resolver: zodResolver(UserCreationSchema),
		defaultValues: {
			role: "USER",
			username: "",
			password: "",
			name: "",
			surname: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof UserCreationSchema>) => {
		setDisabled(true);

		try {
			await register(data);
			onUserCreated();
		} catch (error) {
			toast({
				title: "Error creando el usuario",
			});
			setDisabled(false);
			return;
		}
		toast({
			title: `El usuario ${data.username} ha sido creado con exito`,
		});

		setDisabled(false);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Crear Usuario</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Crea un nuevo Usuario</DialogTitle>
					<DialogDescription>
						Aqui puedes crear nuevos usuarios, estos pueden ser:
						<br />
						- Administradores podran generar nuevas clases y profesores.
						<br />- Profesores solo podran ver las clases asignadas a ellos.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de usuario</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contraseña</FormLabel>
									<FormControl>
										<Input type='password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='surname'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Apellidos</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='role'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Rol</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='USER'>Profesor</SelectItem>
											<SelectItem value='ADMIN'>Administrado</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button disabled={disabled} type='submit'>
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
