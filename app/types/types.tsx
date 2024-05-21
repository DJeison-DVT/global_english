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

export enum Weekdays {
	Monday = 0,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
}

export interface Subject {
	id: string;
	company: string;
	name: string;
	startingDate: string;
	endDate: string;
	students: Student[];
	weekdays: Weekdays[];
}

export type Assistance = {
	student: Student;
	assisted: boolean;
	class: Class;
};
