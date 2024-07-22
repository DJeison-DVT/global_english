import { z } from "zod";

const UserSchema = z.object({
	username: z.string().min(3).max(255),
	password: z.string().min(8).max(255),
});

const UserCreationSchema = UserSchema.extend({
	name: z.string().max(255),
	surname: z.string().max(255),
	role: z.enum(["ADMIN", "USER", "SUPERVISOR"]).optional(),
});

const CompanySchema = z.object({
	name: z.string().min(3).max(255),
});

const StudentsCreationSchema = z.object({
	students: z.array(z.object({ name: z.string().min(3).max(255) })),
});

const StudentSchema = z.object({
	fullname: z.string().min(3).max(255),
	courseId: z.number(),
});

const CourseSchema = z
	.object({
		name: z.string().min(3).max(255),
		level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
		companyId: z.number().optional(),
		professorId: z.number().optional(),
		dateRange: z.object(
			{
				from: z.date(),
				to: z.date(),
			},
			{
				required_error: "Este campo es requerido",
			}
		),
		weekdays: z
			.array(
				z.enum([
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday",
				])
			)
			.nonempty(),
	})
	.refine((data) => data.dateRange.to >= data.dateRange.from, {
		path: ["dateRange"],
		message: "La fecha de fin debe ser después de la fecha de inicio",
	});

export {
	UserSchema,
	UserCreationSchema,
	CourseSchema,
	CompanySchema,
	StudentSchema,
	StudentsCreationSchema,
};
