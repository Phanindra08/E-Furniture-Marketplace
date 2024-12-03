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

	if (!username || !email || !password) {
		return res
			.status(HTTP_RESPONSE.BAD_REQUEST.CODE)
			.json({ error: "The fields username, email, password are required." });

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
					email: "A user has already registered with this email address."
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

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userDetails = await User.findById(id).select("-password"); // Exclude password
        if (!userDetails) {
            return res
                .status(HTTP_RESPONSE.NOT_FOUND.CODE)
                .json({ error: "User not found." });
        }
        return res.status(HTTP_RESPONSE.OK.CODE).json(userDetails);
    } catch (err) {
        console.error("Error retrieving user details:", err);
        return res.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE).json({
            error: "Failed to retrieve user details.",
        });
    }
};

// Update User Details
export const updateUserDetails = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email) {
        return res
            .status(HTTP_RESPONSE.BAD_REQUEST.CODE)
            .json({ error: "Email is required to update user details." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(HTTP_RESPONSE.NOT_FOUND.CODE)
                .json({ error: "No user is registered with this email." });
        }

        // Update user details
        if (username) user.username = username;
        if (password) user.password = await hashPassword(password);

        await user.save();
        const userWithoutPassword = await createUserWithoutPass(user);
        const token = await createToken({ id: userWithoutPassword.id });

        return res
            .status(HTTP_RESPONSE.OK.CODE)
            .json({ data: userWithoutPassword, token });
    } catch (err) {
        console.error("Error inside updateUserDetails:", err);
        return res.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE).json({
            error: "An error occurred while updating user details.",
        });
    }
};