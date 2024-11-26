import { Product } from "../models/product.js";
import { randomFnForProducts } from "../utils/utils.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import {seedProducts} from "../seeds/products.js"
import { User } from "../models/user.js";

// get all products=======================================
export const getAllProducts = async (req, res) => {
    try {
        if (Object.keys(req.query).length === 0) {
            const products = await Product.find({ sold: false }).populate('seller');
            return res.json({ data: products });
		} else {
			console.log("else part");
			// const colors = req.query.color?.split(",") || [];
			const categories = req.query.category?.split(",") || [];
			// const collections = req.query.collection?.split(",") || [];
			const price = req.query.price ? Number(req.query.price) : null;

			const query = {};

			// if (colors.length > 0) {
			// 	query.color = { $in: colors };
			// }

			if (categories.length > 0) {
				query.category = { $in: categories };
			}

			// if (collections.length > 0) {
			// 	query.collection_ = { $in: collections };
			// }

			if (price !== null) {
				query.price = { $lt: price };
			}

			const products = await Product.find(query);
			console.log("products",products);
			return res.json({ data: products });
		}
	} catch (error) {
		console.error("Error details:", error);
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};

// get search value
export const getSearchValue = async (req, res) => {
	try {
		const { searchvalue } = req.params;
		const products = await Product.find({
			$or: [{ title: searchvalue, sold: false }, { category: searchvalue, sold: false }],
		});
		res.status(HTTP_RESPONSE.OK.CODE).json({ data: products });
	} catch (err) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};

// Add a new product to the list ===============================
export const addProduct = async (req, res) => {
	try {
		const { title, description, price, category, img, location, sold } = req.body;
		
		if (!req.user || !req.user.id) {
			return res.status(400).json({ message: "User not authenticated" });
		}
		
		const username = await User.findById(req.user.id);
		// Create a new product instance with the provided data
		const newProduct = new Product({
            title,
            description,
            price,
            category,
            img,
            location,
            userId: req.user.id,
            seller: username,
			sold
        });

		// Save the new product to the database
		const savedProduct = await newProduct.save();
		// Respond with the newly created product
		return res.status(HTTP_RESPONSE.OK.CODE).json({ data: savedProduct });
	} catch (error) {
		// Handle errors
		console.error("Detailed error:", error);
		return res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json({ message: "Error adding product", error: error.message || error });
	}
};


export const getMyProducts = async (req, res) => {
    try {
        const userprods = await Product.find({ userId: req.user.id });
		return res.json(userprods);
    } catch (error) {
        // Handle errors
        console.error("Detailed error:", error);
        return res
            .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
            .json({ message: "Error adding product", error: error.message || error });
    }
};

// Update product details by ID 
export const updateProductById = async (req, res) => {
    console.log("updateProductById")
    try {
        const { productId } = req.params;
        const { title, description, price, category, img, location } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { title, description, price, category, img, location },
            { new: true, runValidators: true } // Return the updated product and validate inputs
        );

        if (!updatedProduct) {
            return res
                .status(HTTP_RESPONSE.NOT_FOUND.CODE)
                .json({ message: "Product not found" });
        }

        // Return the updated product details
        return res.status(HTTP_RESPONSE.OK.CODE).json({ data: updatedProduct });
    } catch (error) {
        console.error("Error updating product details:", error);
        return res
            .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
            .json({ message: "Failed to update product details", error: error.message });
    }
};

export const markAsSold = async (req, res) => {
    console.log("Marking product as sold");
    try {
        const { sold, productId, userId } = req.body;

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { sold },
            { new: true, runValidators: true } // Return the updated product and validate inputs
        );

        if (!updatedProduct) {
            return res
                .status(HTTP_RESPONSE.NOT_FOUND.CODE)
                .json({ message: "Product not found" });
        }

        // Return the updated product details
        return res.status(HTTP_RESPONSE.OK.CODE).json({ data: updatedProduct });
    } catch (error) {
        console.error("Error updating product details:", error);
        return res
            .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
            .json({ message: "Failed to update product details", error: error.message });
    }
};