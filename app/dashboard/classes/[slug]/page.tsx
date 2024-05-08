import Breadcrumb from "../../components/Breadcrumb";
import Sidebar from "./components/Sidebar";

export default function Page({ params }: { params: { slug: string } }) {
	return (
		<div className='w-full bg-secondary'>
			<div className='mx-24'>
				<Breadcrumb breadcrumbs={["Clases", params.slug]} />
				<div>
					<Sidebar />
					<div></div>
				</div>
			</div>
		</div>
	);
}
