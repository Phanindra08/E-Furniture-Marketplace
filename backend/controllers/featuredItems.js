import { Product } from "../models/product.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// Get all featured items
export const getFeaturedItems = async (req, res) => {
	try {
		const featuredItems = await Product.find({ feature: true });
		res.status(HTTP_RESPONSE.OK.CODE).json({ data: featuredItems });
	} catch {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
