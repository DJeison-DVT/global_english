"use client";

import Image from "next/image";
import { Briefcase, Calendar, Settings } from "react-feather";
import Tooltipped from "@/app/components/Tooltipped";
import MenuItem from "./MenuItem";
import { useRouter } from "next/navigation";

export default function Sidebar() {
	const router = useRouter();
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
						<div
							onClick={() => {
								router.push("/dashboard");
							}}
						>
							<MenuItem title='Clases' icon={Briefcase} />
						</div>
						<div
							onClick={() => {
								router.push("/dashboard");
							}}
						>
							<MenuItem title='Calendario' icon={Calendar} />
						</div>
					</div>
				</div>
				<div className='flex justify-end'>
					<Tooltipped tooltip='Opciones'>
						<Settings />
					</Tooltipped>
				</div>
			</div>
		</div>
	);
}
