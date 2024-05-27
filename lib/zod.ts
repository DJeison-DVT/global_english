import { z } from "zod";

const User = z.object({
	username: z.string().min(3).max(255),
	password: z.string().min(8).max(255),
	name: z.string().max(255),
	surname: z.string().max(255),
});

const UserCreation = User.extend({
	role: z.enum(["ADMIN", "USER"]).optional(),
});

export { User, UserCreation };
