import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export default function generateToken(
	id: number,
	username: string,
	role: string
) {
	return jwt.sign({ userId: id, username, role }, JWT_SECRET, {
		expiresIn: "3h",
	});
}
