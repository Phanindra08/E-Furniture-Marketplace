import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const secret = process.env.SECRET;

export const hashPassword = async (password) => {
	return bcrypt.hashSync(password, saltRounds);
};

export const createToken = async (payload) => {
	return jwt.sign(payload, secret);
};

export const checkPasswordMatch = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};
