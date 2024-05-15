import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
	titles: string[];
	links: string[];
}

export default function Header({ titles, links }: HeaderProps) {
	if (titles.length !== links.length) {
		throw new Error("Titles and links must have the same length");
	}

	if (titles.length == 1) {
		return (
			<div className='my-3'>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href={links[0]}>{titles[0]}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<Separator className='bg-slate-400' />
			</div>
		);
	}
	const length = titles.length;

	return (
		<div className='my-3'>
			<Breadcrumb>
				<BreadcrumbList>
					{titles.map((title, index) => (
						<>
							<BreadcrumbItem key={title}>
								<BreadcrumbLink href={links[index]}>{title}</BreadcrumbLink>
							</BreadcrumbItem>
							{index < length - 1 && <BreadcrumbSeparator />}
						</>
					))}
				</BreadcrumbList>
			</Breadcrumb>
			<Separator className='bg-slate-400' />
		</div>
	);
}
