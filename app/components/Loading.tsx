import { LoaderCircle } from "lucide-react";

interface LoadingProps {
	active?: boolean;
	children: React.ReactNode;
}

export default function Loading({ active = false, children }: LoadingProps) {
	if (!active) {
		return children;
	} else {
		return (
			<div className='flex justify-center items-center w-full h-full'>
				<LoaderCircle size={48} className='animate-spin' />
			</div>
		);
	}
}
