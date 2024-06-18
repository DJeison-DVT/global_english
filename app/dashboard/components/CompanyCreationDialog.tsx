import { createCompany } from "@/app/utils/api/companies";
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
import { toast } from "@/components/ui/use-toast";
import { CompanySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CompanyCreationDialogProps {
	onCompanyCreated: () => void;
}

export default function CompanyCreationDialog({
	onCompanyCreated,
}: CompanyCreationDialogProps) {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const form = useForm<z.infer<typeof CompanySchema>>({
		resolver: zodResolver(CompanySchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof CompanySchema>) => {
		setDisabled(true);

		try {
			await createCompany(data);
			onCompanyCreated();
		} catch (error) {
			toast({
				title: "Error creando la compañia",
			});
			setDisabled(false);
			return;
		}
		toast({
			title: `La compañia ${data.name} ha sido creada con exito`,
		});

		setDisabled(false);
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Crear compañia</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Nueva compañia</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre de la compañia</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
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
