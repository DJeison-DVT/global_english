import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Company } from "@prisma/client";
import { Tool } from "react-feather";
import DeletionDialog from "./DeletionDialog";

interface CompanyCardProps {
	company: Company;
	handleCompanyDelete: (id: string) => Promise<void> | null;
}

export default function CompanyCard({
	company,
	handleCompanyDelete,
}: CompanyCardProps) {
	return (
		<div className="flex w-full bg-background rounded-md p-2 justify-between gap-3">
			<div className="flex items-center">{company.name}</div>
			<DeletionDialog
				id={company.id}
				title={company.name}
				handleDelete={() => handleCompanyDelete(String(company.id))}
			/>
		</div>
	);
}
