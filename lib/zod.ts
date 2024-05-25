import { z } from "zod";

const UserCreation = z.object({
	username: z.string().min(3).max(255),
	password: z.string().min(8).max(255),
	role: z.enum(["ADMIN", "USER"]).optional(),
});

export default UserCreation;
