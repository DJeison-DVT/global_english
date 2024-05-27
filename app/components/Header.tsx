import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { User } from "react-feather";
import { getSession } from "@/lib/auth";
import { Token } from "../utils/authHelpers";

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

export default async function Header({ titles, links }: HeaderProps) {
	const token = await getSession();
	return (
		<div className='my-3'>
			<div className='flex justify-between'>
				{renderBreadcrumb(titles, links)}
				<div className='flex items-center gap-3'>
					<div>
						{token && (
							<div className='text-sm font-semibold'>{token.username}</div>
						)}
					</div>
				</div>
			</div>
			<Separator />
		</div>
	);
}
