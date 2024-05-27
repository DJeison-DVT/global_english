import { z } from "zod";

const UserSchema = z.object({
	username: z.string().min(3).max(255),
	password: z.string().min(8).max(255),
});

const UserCreationSchema = UserSchema.extend({
	name: z.string().max(255),
	surname: z.string().max(255),
	role: z.enum(["ADMIN", "USER"]).optional(),
});

const CompanySchema = z.object({
	name: z.string().min(3).max(255),
});

const StudentSchema = z.object({
	fullname: z.string().min(3).max(255),
	courseId: z.number(),
});

const CourseSchema = z.object({
	name: z.string().min(3).max(255),
	companyId: z.number(),
	professorId: z.number(),
	startingDate: z.date(),
	endingDate: z.date(),
	level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
	weekdays: z.array(
		z.enum([
			"MONDAY",
			"TUESDAY",
			"WEDNESDAY",
			"THURSDAY",
			"FRIDAY",
			"SATURDAY",
			"SUNDAY",
		])
	),
});

export { UserSchema, UserCreationSchema };
