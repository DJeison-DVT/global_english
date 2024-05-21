import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Subjects } from "@/app/utils/consts";
import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";

export interface viewProps {
	totalStudents: number;
}

export default function Page() {
	const totalStudents = Subjects[0].students.length;
	return (
		<Tabs defaultValue='weekly' className='w-full h-full flex flex-col'>
			<TabsList>
				<TabsTrigger value='daily'>Diario</TabsTrigger>
				<TabsTrigger value='weekly'>Semanal</TabsTrigger>
			</TabsList>
			<TabsContent value='daily' className=' overflow-hidden'>
				<DailyView totalStudents={totalStudents} />
			</TabsContent>
			<TabsContent value='weekly' className='h-[calc(100%-40px)] '>
				<WeeklyView totalStudents={totalStudents} />
			</TabsContent>
		</Tabs>
	);
}
