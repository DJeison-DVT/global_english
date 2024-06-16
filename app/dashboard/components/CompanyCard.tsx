import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Company } from "@prisma/client";
import { Tool } from "react-feather";

export default function CompanyCard({ company }: { company: Company }) {
	return (
		<div className='flex w-full bg-background rounded-md p-2 justify-between gap-3'>
			<div className='flex items-center'>{company.name}</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className='hover:bg-slate-500/40 rounded-full p-1'>
							<Tool />
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<p>Editar</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
