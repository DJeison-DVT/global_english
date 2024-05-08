interface BreadcrumbsProps {
	breadcrumbs: string[];
}

export default function Breadcrumb({ breadcrumbs }: BreadcrumbsProps) {
	return (
		<div className='border-b-2 border-tertiary/60 py-5 mb-5 text-2xl'>
			{breadcrumbs.map((breadcrumb, index) => (
				<span key={breadcrumb} className='text-tertiary'>
					{breadcrumb}
					{index !== breadcrumbs.length - 1 && (
						<span className='mx-2 text-tertiary'>/</span>
					)}
				</span>
			))}
		</div>
	);
}
