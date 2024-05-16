export interface Student {
	id: string;
	name: string;
	surname: string;
}

export interface Class {
	date: string;
	assisted: Student[];
	Subject: Subject;
}

export interface Subject {
	id: string;
	company: string;
	name: string;
	startingDate: string;
	endDate: string;
	students: Student[];
}
