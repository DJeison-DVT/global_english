export interface Student {
	id: string;
	fullname: string;
}

export const weekdayValues = {
	MONDAY: 0,
	TUESDAY: 1,
	WEDNESDAY: 2,
	THURSDAY: 3,
	FRIDAY: 4,
	SATURDAY: 5,
	SUNDAY: 6,
};

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
