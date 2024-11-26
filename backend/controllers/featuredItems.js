import { Product } from "../models/product.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// Get all featured items
export const getFeaturedItems = async (req, res) => {
	try {
		const featuredItems = await Product.find({}).sort({ createdAt: -1 }).limit(4);
		const featuredItemsFiltered = featuredItems.map(product => {
            let imgBase64 = null;

            if (product.img && product.img.data) {
                // Convert Buffer to Base64 and include the MIME type
                imgBase64 = `data:${product.img.contentType};base64,${product.img.data.toString('base64')}`;
            }

            // Return the product with the Base64 image
            return {
                ...product._doc, // Spread the document properties
                img: imgBase64,  // Replace `img` with the Base64 string
            };
        });
		res.status(HTTP_RESPONSE.OK.CODE).json({ data: featuredItemsFiltered });
	} catch {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
