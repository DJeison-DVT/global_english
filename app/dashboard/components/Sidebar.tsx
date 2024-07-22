import Link from "next/link";
import Image from "next/image";
import { Briefcase, Calendar, Power, Settings } from "react-feather";
import MenuItem from "./MenuItem";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth";

export default function Sidebar() {
	return (
		<div className='flex-none w-60 bg-white p-8 '>
			<div className='flex flex-col justify-between h-full'>
				<div className='flex flex-col gap-2 items-center '>
					<Image
						src='/logo_cropped.jpg'
						alt='Logo'
						width={140}
						height={80}
						className='pb-4'
					/>
					<div className='w-full *:w-full flex flex-col gap-3'>
						<Link href='/dashboard'>
							<MenuItem title='Clases' icon={Briefcase} />
						</Link>
						{/* <Link href='/dashboard'>
							<MenuItem title='Calendario' icon={Calendar} />
						</Link> */}
					</div>
				</div>
				<div className='flex justify-end outline-none'>
					<DropdownMenu>
						<DropdownMenuTrigger className='focus:outline-none'>
							<div className='p-2 rounded-full hover:bg-primary/20 focus:bg-primary/20 focus-within:bg-primary/20'>
								<Settings />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<form
									action={async () => {
										"use server";
										let response = null;
										try {
											response = await logout();
										} catch (error) {
											console.error(error);
										}

										if (response && response.status === 201) {
											redirect("/");
										} else {
											console.error("received error from login API");
										}
									}}
									className='w-full'
								>
									<button
										type='submit'
										className='flex justify-between w-full mr-2 items-center text-red-500'
									>
										<div>Salir</div>
										<Power size={18} />
									</button>
								</form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}
