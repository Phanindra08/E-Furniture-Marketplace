import { Product } from "../models/product.js";
import { seedProducts } from "../seeds/products.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import cloudinary from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

// seed product data
export const seedProductDB = async (req, res) => {
	// delete all the images from cloudinary
	// cloudinary.api.delete_all_resources((error, result) => {
	//     if (error) {
	//       console.log(error);
	//     } else {
	//       console.log(result);
	//     }
	//   });
	try {
		// Upload images to Cloudinary and update products
		const updatedProducts = await Promise.all(
			seedProducts.map(async (product) => {
				// Upload the image to Cloudinary
				const result = await cloudinary.uploader.upload(product.img, {
					folder: "FurniTrade",
					quality: "auto",
					fetch_format: "auto",
					width: 222,
					crop: "scale",
					responsive: true,
				});
				// Return a new product object with the Cloudinary image URL
				return {
					...product,
					img: result.secure_url,
				};
			})
		);

		// Insert the updated products into the database
		const products = await Product.insertMany(updatedProducts);
		console.log("Products inserted into DB", products);
		res.status(HTTP_RESPONSE.OK.CODE).json("Database seeded successfully");
	} catch (err) {
		console.log(err);
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
