import React from "react";
import ClassCard from "./components/ClassCard";
import Header from "../components/Header";

// TODO
// Change from dummy data to real data
import { Subjects } from "@/app/utils/consts";

export default function dashboard() {
	return (
		<div className='flex-1 bg-secondary'>
			<div className='mx-24'>
				<div>
					<Header titles={["Clases"]} links={["/dashboard"]} />
				</div>
				<div className='flex flex-wrap gap-10 justify-start'>
					{Subjects.map((subject) => (
						<ClassCard key={subject.id} {...subject} />
					))}
				</div>
			</div>
		</div>
	);
}
