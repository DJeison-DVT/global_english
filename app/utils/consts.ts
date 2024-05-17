import { Student, Subject, Class, Assistance } from "@/app/types/types";

const Students: Student[] = [
	{
		id: "1",
		name: "John",
		surname: "Doe",
	},
	{
		id: "2",
		name: "Jane",
		surname: "Bricket",
	},
	{
		id: "3",
		name: "Alice",
		surname: "Johnson",
	},
	{
		id: "4",
		name: "Bob",
		surname: "Smith",
	},
	{
		id: "5",
		name: "Charlie",
		surname: "Brown",
	},
	{
		id: "6",
		name: "David",
		surname: "Williams",
	},
	{
		id: "7",
		name: "Eve",
		surname: "Davis",
	},
	{
		id: "8",
		name: "Frank",
		surname: "Taylor",
	},
	{
		id: "9",
		name: "Grace",
		surname: "Moore",
	},
	{
		id: "10",
		name: "Henry",
		surname: "Anderson",
	},
	{
		id: "11",
		name: "Isabel",
		surname: "Martinez",
	},
	{
		id: "12",
		name: "Jack",
		surname: "Harris",
	},
	{
		id: "13",
		name: "Katy",
		surname: "Clark",
	},
	{
		id: "14",
		name: "Liam",
		surname: "Young",
	},
	{
		id: "15",
		name: "Mia",
		surname: "Allen",
	},
	{
		id: "16",
		name: "Nathan",
		surname: "King",
	},
	{
		id: "17",
		name: "Olivia",
		surname: "Scott",
	},
	{
		id: "18",
		name: "Peter",
		surname: "Green",
	},
	{
		id: "19",
		name: "Quinn",
		surname: "Baker",
	},
	{
		id: "20",
		name: "Rachel",
		surname: "Adams",
	},
	{
		id: "21",
		name: "Sam",
		surname: "Parker",
	},
	{
		id: "22",
		name: "Tina",
		surname: "Evans",
	},
	{
		id: "23",
		name: "Ulysses",
		surname: "Morris",
	},
	{
		id: "24",
		name: "Violet",
		surname: "Butler",
	},
	{
		id: "25",
		name: "William",
		surname: "Ward",
	},
	{
		id: "26",
		name: "Xavier",
		surname: "Cole",
	},
	{
		id: "27",
		name: "Yvonne",
		surname: "Garcia",
	},
	{
		id: "28",
		name: "Zach",
		surname: "Hall",
	},
];
export const Subjects: Subject[] = [
	{
		id: "1",
		company: "Company 1",
		name: "English 101",
		startingDate: "2021-01-01",
		endDate: "2021-01-31",
		students: [
			Students[0],
			Students[1],
			Students[2],
			Students[3],
			Students[4],
			Students[5],
			Students[6],
			Students[7],
			Students[8],
			Students[9],
			Students[10],
			Students[11],
			Students[12],
			Students[13],
		],
	},
	{
		id: "2",
		company: "Company 2",
		name: "English 201",
		startingDate: "2021-02-01",
		endDate: "2021-02-28",
		students: [Students[0], Students[1], Students[2], Students[3]],
	},
	{
		id: "3",
		company: "Company 3",
		name: "English 301",
		startingDate: "2021-03-01",
		endDate: "2021-03-31",
		students: [
			{
				id: "1",
				name: "Name 1",
				surname: "Surname 1",
			},
			{
				id: "2",
				name: "Name 2",
				surname: "Surname 2",
			},
		],
	},
	{
		id: "4",
		company: "Company 4",
		name: "English 401",
		startingDate: "2021-04-01",
		endDate: "2021-04-30",
		students: [],
	},
	{
		id: "5",
		company: "Company 5",
		name: "English 501",
		startingDate: "2021-05-01",
		endDate: "2021-05-31",
		students: [],
	},
];

export const classAssistance: Class[] = [
	{
		date: "2021-09-01",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-02",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-03",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-04",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-05",
		assisted: [Students[0], Students[1], Students[2]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-06",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-07",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-08",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-09",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-10",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-11",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-12",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-13",
		assisted: [Students[0], Students[1], Students[2], Students[3]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-14",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-15",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-16",
		assisted: [Students[0]],
		Subject: Subjects[0],
	},
	{
		date: "2021-09-17",
		assisted: [Students[0], Students[1]],
		Subject: Subjects[0],
	},
];
