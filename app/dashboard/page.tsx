import React from "react";
import { Settings } from "react-feather";

interface Class {
	institution: string;
	period: string;
}

function dashboard() {
	const scheduledClasses = [];

	return (
		<div className='min-h-screen max-h-screen max-w-screen flex '>
			<div className='flex-none w-72 bg-white flex-col justify-between'>
				<div></div>
				<div className='flex justify-end'>
					<Settings />
				</div>
			</div>
			<div className='flex-1 bg-secondary'></div>
		</div>
	);
}

export default dashboard;
