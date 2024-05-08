interface TooltippedProps {
	tooltip: string;
	children: React.ReactNode;
}

const Tooltipped: React.FC<TooltippedProps> = ({ tooltip, children }) => {
	return (
		<div className='has-tooltip'>
			<span className='tooltip rounded shadow-lg p-1 bg-white -mt-8 text-black drop-shadow-sm'>
				{tooltip}
			</span>
			{children}
		</div>
	);
};

export default Tooltipped;
