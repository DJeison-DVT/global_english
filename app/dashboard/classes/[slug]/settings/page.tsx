import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
	const session = await getSession();
	if (!session || (session && session.role !== "ADMIN")) redirect("/dashboard");

	return (
		<div>
			<h1>Settings</h1>
		</div>
	);
}
