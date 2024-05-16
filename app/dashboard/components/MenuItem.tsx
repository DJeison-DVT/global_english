interface MenuItemProps {
	title: string;
	icon: React.ComponentType;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon: Icon }) => {
	return (
		<div className='hover:cursor-pointer flex items-center justify-between w-full py-2 transition-colors duration-300 hover:bg-primary p-2 hover:text-white rounded-xl'>
			<Icon />
			<div>{title}</div>
		</div>
	);
};

export default MenuItem;
