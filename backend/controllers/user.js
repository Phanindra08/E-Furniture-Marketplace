import { User } from "../models/user.js";
import {
	hashPassword,
	createToken,
	checkPasswordMatch,
} from "../utils/auth.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// create user without password=============================
const createUserWithoutPass = async (user) => {
	const newUser = {
		username: user.username,
		email: user.email,
		id: user.id,
	};
	return newUser;
};

// create user=============================================
export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	if (!password) {
		return res
			.status(HTTP_RESPONSE.BAD_REQUEST.CODE)
			.json({ error: "Password is required" });
	}

	const passwordHashed = await hashPassword(password);

	try {
		//check to make sure the email provided not registered
		const registeredUser = await User.findOne({ email: email });

		if (registeredUser) {
			// throw an error if the email address already registered
			return res
				.status(HTTP_RESPONSE.BAD_REQUEST.CODE)
				.json({
					email: "A user has already registered with this email address.",
				});
		} else {
			// create a new user
			const newUser = new User({
				username,
				email,
				password: passwordHashed,
			});

			await newUser.save();

			const userWithoutpassword = await createUserWithoutPass(newUser);
			const token = await createToken({ id: userWithoutpassword.id });

			return res
				.status(HTTP_RESPONSE.OK.CODE)
				.json({ data: userWithoutpassword, token });
		}
	} catch (err) {
		console.log("error inside register user!", err);
	}
};

// log in user==================================================
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const foundUser = await User.findOne({ email });
		if (!foundUser) {
			return res
				.status(HTTP_RESPONSE.NOT_FOUND.CODE)
				.json({ error: "Invalid email or password..." });
		}

		// check password match
		const matchedPassword = await checkPasswordMatch(
			password,
			foundUser.password
		);
		if (!matchedPassword) {
			return res
				.status(HTTP_RESPONSE.UNAUTHORIZED.CODE)
				.json({ error: "Invalid email or password..." });
		}

		const userWithoutPassword = await createUserWithoutPass(foundUser);
		const token = await createToken({ id: userWithoutPassword.id });

		return res
			.status(HTTP_RESPONSE.OK.CODE)
			.json({ data: userWithoutPassword, token });
	} catch (err) {
		console.log("An error inside user login.", err);
		return res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
