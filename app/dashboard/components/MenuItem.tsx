interface MenuItemProps {
	title: string;
	icon: React.ComponentType;
	selected?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, icon: Icon, selected }) => {
	return (
		<div
			className={`flex items-center justify-between w-full py-2 transition-colors duration-300 p-2 rounded-xl ${
				selected
					? "bg-primary text-white"
					: "hover:bg-primary hover:text-white hover:cursor-pointer "
			}`}
		>
			<Icon />
			<div>{title}</div>
		</div>
	);
};

export default MenuItem;
