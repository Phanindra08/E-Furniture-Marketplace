import { Product } from "../models/product.js";
import { randomFnForProducts } from "../utils/utils.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import {seedProducts} from "../seeds/products.js"
import { User } from "../models/user.js";

//get all products=======================================
export const getAllProducts = async (req, res) => {
    try {
        const { category, excludedCategories, price, location, excludedLocations } = req.query; // Extract query parameters
    
        // Initialize the filters array
        const filters = [];
    
        // Location filter
        const locationConditions = [];
        if (location) {
            locationConditions.push({
                location: {
                    $regex: `(?:^|\\b)${location.replace(/\s/g, "\\s*")}(?:\\b|$)`,
                    $options: "i" // Case-insensitive matching
                }
            });
        }
        if (excludedLocations) {
            const excludedLocationsArray = excludedLocations.split(",").filter(exc =>
                !location || exc.toLowerCase() !== location.toLowerCase()
            );
            if (excludedLocationsArray.length) {
                locationConditions.push({
                    location: {
                        $not: {
                            $regex: `(?:^|\\b)(${excludedLocationsArray.map(exc => exc.replace(/\s/g, "\\s*")).join("|")})(?:\\b|$)`,
                            $options: "i" // Case-insensitive matching
                        }
                    }
                });
            }
        }
        if (locationConditions.length) {
            filters.push({ $or: locationConditions });
        }
    
        // Category filter
        const categoryConditions = [];
        if (category) {
            categoryConditions.push({
                category: {
                    $regex: `(?:^|\\b)${category.replace(/\s/g, "\\s*")}(?:\\b|$)`,
                    $options: "i" // Case-insensitive matching
                }
            });
        }
        if (excludedCategories) {
            const excludedCategoriesArray = excludedCategories.split(",").filter(exc =>
                !category || exc.toLowerCase() !== category.toLowerCase()
            );
            if (excludedCategoriesArray.length) {
                categoryConditions.push({
                    category: {
                        $not: {
                            $regex: `(?:^|\\b)(${excludedCategoriesArray.map(exc => exc.replace(/\s/g, "\\s*")).join("|")})(?:\\b|$)`,
                            $options: "i" // Case-insensitive matching
                        }
                    }
                });
            }
        }
        if (categoryConditions.length) {
            filters.push({ $or: categoryConditions });
        }
    
        // Price filter
        if (price) {
            const numericPrice = Number(price);
            if (!isNaN(numericPrice)) {
                filters.push({
                    price: { $lte: numericPrice } // Ensure price is treated as a number
                });
            }
        }
    
        // Combine all filters using $and
        const query = filters.length ? { $and: filters } : {};

        // Fetch filtered products
        const products = await Product.find(query).populate('seller');

        // Return the filtered products
        return res.status(HTTP_RESPONSE.OK.CODE).json({ data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res
            .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
            .json({ message: "Error fetching products", error: error.message });
    }
};



// export const getAllProducts = async (req, res) => {
//     try {
//         const { category, title, price } = req.query; // Extract query parameters

//         // Build the query object
//         const query = {};

//         // Add category filter if provided
//         if (category) {
//             const categories = category.split(","); // Split categories by comma
//             query.category = { $in: categories };   // Match any of the specified categories
//         }

//         // Add title filter if provided (case-insensitive partial match)
//         if (title) {
//             query.title = { $regex: title, $options: "i" }; // Case-insensitive search
//         }

//         // Add price filter if provided
//         if (price) {
//             query.price = { 
//                 $lte: price.toString() // Ensure the price is compared as a string
//             };
//         }

//         // Fetch filtered products
//         const products = await Product.find(query).populate('seller');

//         // Return the filtered products
//         return res.status(HTTP_RESPONSE.OK.CODE).json({ data: products });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return res
//             .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
//             .json({ message: "Error fetching products", error: error.message });
//     }
// };



// get search value
export const getSearchValue = async (req, res) => {
	try {
		const { searchvalue } = req.params;
		const products = await Product.find({
            $or: [
              { title: { $regex: `${searchvalue.replace(/\s/g, "\\s*")}`, $options: 'i' } },
              { category: { $regex: `${searchvalue.replace(/\s/g, "\\s*")}`, $options: 'i' } },
              { location: { $regex: `${searchvalue.replace(/\s/g, "\\s*")}`, $options: 'i' } }
            ],
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
		const { title, description, price, category, img, location } = req.body;
		
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
            seller: username
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

// Delete a product by ID
export const deleteProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check if the user is authenticated and owns the product
        const product = await Product.findById(productId);

        if (!product) {
            return res
                .status(HTTP_RESPONSE.NOT_FOUND.CODE)
                .json({ message: "Product not found" });
        }

        if (product.userId.toString() !== req.user.id) {
            return res
                .status(HTTP_RESPONSE.FORBIDDEN.CODE)
                .json({ message: "You are not authorized to delete this product" });
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        // Return a success response
        return res.status(HTTP_RESPONSE.OK.CODE).json({
            message: "Product successfully deleted",
            productId: productId,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res
            .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
            .json({ message: "Failed to delete product", error: error.message });
    }
};
