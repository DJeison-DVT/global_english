"use client";

import { URLBuilder } from "@/lib/utils";
import { User } from "@prisma/client";
import ClassCard from "./ClassCard";
import { useEffect, useState } from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline'>Crear Usuario</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-md'>
						<DialogHeader>
							<DialogTitle>Crea un nuevo Profesor o Administrador</DialogTitle>
							<DialogDescription>
								Administradores podran generar nuevas clases y profesores.
								<br />
								Profesores solo podran ver las clases asignadas a ellos.
							</DialogDescription>
						</DialogHeader>
						<form action='' className='flex flex-col gap-3'>
							<Label htmlFor='username'>Nombre de usuario</Label>
							<Input type='text' id='username' name='username' />
							<Label htmlFor='password'>Contraseña</Label>
							<Input type='password' id='password' name='password' />
							<Label htmlFor='name'>Nombre</Label>
							<Input type='text' id='name' name='name' />
							<Label htmlFor='surname'>Apellidos</Label>
							<Input type='text' id='surname' name='surname' />
							<Button type='submit' size='sm' className='px-3'>
								Crear
							</Button>
						</form>
					</DialogContent>
				</Dialog>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline'>Crear Clase</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-md'>
						<DialogHeader>
							<DialogTitle>Crea una nueva clase </DialogTitle>
						</DialogHeader>
						<form action='' className='flex flex-col gap-3'>
							<Label>Nombre de usuario</Label>
							<Input />
							<Button type='submit' size='sm' className='px-3'>
								Crear
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<div className='flex-1'></div>
		</section>
	);
}
