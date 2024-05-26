import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwtsecret";

export type Token = {
	username: string;
	role: string;
	iat: number;
	exp: number;
};

function generateToken(id: number, username: string, role: string) {
	const token = jwt.sign({ userId: id, username, role }, JWT_SECRET, {
		expiresIn: "3h",
	});
	return token;
}

function decrypt(token: string) {
	try {
		return jwt.verify(token, JWT_SECRET);
	} catch (error) {
		return null;
	}
}

export { generateToken, decrypt };
