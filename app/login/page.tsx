import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default async function Page() {
	const session = await getSession();

	if (session) redirect("/dashboard");

	return (
		<section className='h-screen grid items-center justify-center w-full'>
			<Card className='max-w-96 '>
				<CardHeader className='text-center text-2xl font-bold'>
					Inicia sesión
				</CardHeader>
				<CardContent className='mx-auto w-[300px] h-[190px] grid items-center justify-center'>
					<Image src='/logo_cropped.jpg' alt='Logo' width={500} height={500} />
				</CardContent>

				<CardContent>
					<form
						action={async (formData) => {
							"use server";
							let response = null;
							try {
								response = await login(formData);
							} catch (error) {
								console.error(error);
							}

							if (response && response.status === 201) {
								redirect("/dashboard");
							} else {
								console.error("received error from login API");
							}
						}}
						className='grid gap-4'
					>
						<Label htmlFor='username'>Nombre de usuario</Label>
						<Input type='text' id='username' name='username' />
						<Label htmlFor='password'>Contraseña</Label>
						<Input type='password' id='password' name='password' />
						<Button type='submit'>Entrar</Button>
					</form>
				</CardContent>
			</Card>
		</section>
	);
}
