import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "react-feather";

interface HeaderProps {
	titles: string[];
	links: string[];
}

function renderBreadcrumb(titles: string[], links: string[]) {
	const length = titles.length;
	if (titles.length !== links.length) {
		throw new Error("Titles and links must have the same length");
	}

	if (titles.length == 1) {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href={links[0]}>{titles[0]}</BreadcrumbLink>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		);
	} else {
		return (
			<Breadcrumb>
				<BreadcrumbList>
					{titles.map((title, index) => (
						<React.Fragment key={index}>
							<BreadcrumbItem>
								<BreadcrumbLink href={links[index]}>{title}</BreadcrumbLink>
							</BreadcrumbItem>
							{index < length - 1 && <BreadcrumbSeparator />}
						</React.Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		);
	}
}

export default function Header({ titles, links }: HeaderProps) {
	return (
		<div className='my-3'>
			<div className='flex justify-between'>
				{renderBreadcrumb(titles, links)}
				<div className='flex items-center'>
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>
							<div className='bg-[#d9d9d9] w-full flex items-center justify-center h-full'>
								<User />
							</div>
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<Separator />
		</div>
	);
}
