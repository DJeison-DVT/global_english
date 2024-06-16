import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DailyView from "./components/DailyView";
import WeeklyView from "./components/WeeklyView";

export default function Page() {
	return (
		<Tabs defaultValue='weekly' className='w-full h-full flex flex-col'>
			<TabsList>
				<TabsTrigger value='daily'>Diario</TabsTrigger>
				<TabsTrigger value='weekly'>Semanal</TabsTrigger>
			</TabsList>
			<TabsContent value='daily' className=' overflow-hidden'>
				<DailyView />
			</TabsContent>
			<TabsContent value='weekly' className='h-[calc(100%-40px)] '>
				<WeeklyView />
			</TabsContent>
		</Tabs>
	);
}
