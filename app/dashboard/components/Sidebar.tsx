"use client";

import Link from "next/link";
import Image from "next/image";
import { Briefcase, Calendar, Settings } from "react-feather";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import MenuItem from "./MenuItem";

export default function Sidebar() {
	return (
		<div className='flex-none w-60 bg-white p-10 '>
			<div className='flex flex-col justify-between h-full'>
				<div className='flex flex-col gap-2 items-center '>
					<Image
						src='/logo_cropped.jpg'
						alt='Logo'
						width={140}
						height={80}
						className='pb-4'
					/>
					<div className='w-full *:w-full'>
						<Link href='/dashboard'>
							<MenuItem title='Clases' icon={Briefcase} />
						</Link>
						<Link href='/dashboard'>
							<MenuItem title='Calendario' icon={Calendar} />
						</Link>
					</div>
				</div>
				<div className='flex justify-end'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Settings />
							</TooltipTrigger>
							<TooltipContent>
								<p>Opciones</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
}
