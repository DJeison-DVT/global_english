import Image from "next/image";
import { Briefcase, Calendar, Settings } from "react-feather";

interface MenuItemProps {
	title: string;
	icon: React.ComponentType;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon: Icon }) => {
	return (
		<div className='flex items-center justify-between w-full border-b-4 py-2 border-transparent hover:border-primary transition-colors duration-300'>
			<Icon />
			<div>{title}</div>
		</div>
	);
};

export default function Sidebar() {
	return (
		<div className='flex-none w-60 bg-white p-10 '>
			<div className='flex flex-col justify-between h-full'>
				<div className='flex flex-col gap-2 items-center'>
					<Image
						src='/logo_cropped.jpg'
						alt='Logo'
						width={140}
						height={80}
						className='pb-4'
					/>
					<MenuItem title='Clases' icon={Briefcase} />
					<MenuItem title='Calendario' icon={Calendar} />
				</div>
				<div className='flex justify-end'>
					<Settings />
				</div>
			</div>
		</div>
	);
}
