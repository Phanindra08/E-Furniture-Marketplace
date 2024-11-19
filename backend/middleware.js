import jwt from "jsonwebtoken";

export const isLoggedIn= (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ error: "Access denied. No token provided." });
	}

	try {
		const verified = jwt.verify(token, process.env.SECRET);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).json({ error: "Invalid token." });
	}
};
