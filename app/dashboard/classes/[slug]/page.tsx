import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";
import { getStudentsByClass } from "@/app/utils/api/students";
import { Course, Student, Weekday } from "@prisma/client";
import { getClassById } from "@/app/utils/api/classes";
import { weekdayValues } from "@/app/types/types";

interface ViewProps {
	params: { slug: string };
}

export default async function Page({ params }: ViewProps) {
	const students: Student[] = await getStudentsByClass(Number(params.slug));
	const course: Course = await getClassById(Number(params.slug));

	const weekdays: Weekday[] = course.weekdays.sort(
		(a, b) => weekdayValues[a] - weekdayValues[b]
	);

	return (
		<Tabs defaultValue='weekly' className='w-full h-full flex flex-col'>
			<TabsList>
				{/* <TabsTrigger value='daily'>Diario</TabsTrigger> */}
				<TabsTrigger value='weekly'>Semanal</TabsTrigger>
			</TabsList>
			<TabsContent value='daily' className=' overflow-hidden'>
				<DailyView
					startingDate={course.startingDate}
					endingDate={course.endingDate}
					weekdays={weekdays}
				/>
			</TabsContent>
			<TabsContent value='weekly' className='h-[calc(100%-40px)] '>
				<WeeklyView
					course={course}
					students={students}
					weekdays={weekdays}
					params={params}
				/>
			</TabsContent>
		</Tabs>
	);
}
