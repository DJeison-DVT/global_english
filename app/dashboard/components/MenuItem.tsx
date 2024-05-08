interface MenuItemProps {
	title: string;
	icon: React.ComponentType;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon: Icon }) => {
	return (
		<div className='hover:cursor-pointer flex items-center justify-between w-full border-b-4 py-2 border-transparent hover:border-primary transition-colors duration-300'>
			<Icon />
			<div>{title}</div>
		</div>
	);
};

export default MenuItem;
