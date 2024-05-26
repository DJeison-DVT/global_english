import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession, login } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getSession();

	if (session) redirect("/dashboard");

	return (
		<section>
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
			>
				<Label htmlFor='username'>Nombre de usuario</Label>
				<Input type='text' id='username' name='username' />
				<Label htmlFor='password'>Contraseña</Label>
				<Input type='password' id='password' name='password' />
				<Button type='submit'>Entrar</Button>
			</form>
		</section>
	);
}
