import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "react-feather";

interface DeletionDialogProps {
	id: number;
	title: string;
	handleDelete: (id: string) => Promise<void> | null;
}

export default function DeletionDialog({
	id,
	title,
	handleDelete,
}: DeletionDialogProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<X />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Confirmar eliminación de {title}
					</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Esto eliminará
						permanentemente tu cuenta y eliminar sus datos de
						nuestros servidores.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className="hover:text-red-600"
						onClick={() => handleDelete(String(id))}
					>
						Continuar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
