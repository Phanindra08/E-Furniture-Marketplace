import { Basket } from "../models/basket.js";
import jwt from "jsonwebtoken";
import { HTTP_RESPONSE } from "../utils/config.js";

// post item to user's basket===========================
export const addItemsToBasket = async (req, res) => {
	try {
		console.log("try block")
		const { userId, quantity, productId } = req.body;
		const token = req.headers.authorization;
		const decodedToken = jwt.decode(token);
		const tokenId = decodedToken.id;

		if (tokenId !== userId) {
			return res
				.status(HTTP_RESPONSE.UNAUTHORIZED.CODE)
				.json(HTTP_RESPONSE.UNAUTHORIZED.MESSAGE);
		}
		// find the user's basket
		let basket = await Basket.findOne({ userId });

		// create new basket if not exist
		if (!basket) {
			basket = await Basket.create({
				userId,
				items: [{ productId, quantity }],
			});
		} else {
			
			// check if the item is in the basket already
			let foundItem = basket.items.find((item) => {
				return item._id.toString() === productId;
			});
			console.log("foundItem",foundItem)
			if (foundItem) {
				// update the quantity of the existing item
				console.log("found item")
				foundItem.quantity = Math.max(0, foundItem.quantity + quantity);

				// remove the item if the quantity is zero
				if (foundItem.quantity === 0) {
					basket.items = basket.items.filter(
						(item) => item.productId.toString() !== productId
					);
				}
			} else {
				// add the new item to the basket
				basket.items.push({ productId, quantity });
			}
			basket = await basket.save();
		}

		res.status(HTTP_RESPONSE.OK.CODE).json({ data: basket });
	} catch (err) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};

// get items from the basket=============================================
export const getItemsFromBasket = async (req, res) => {
	try {
		// extract user id from URL parameter
		const { userId } = req.params;

		// Retrieve the user's basket from the database
		const basket = await Basket.findOne({ userId }).populate("items.productId");

		if (basket) {
			basket.items = basket.items.filter(item => (item.productId != null && item.quantity>0));
		  }

		// Send the basket as the response
		res.status(HTTP_RESPONSE.OK.CODE).json({ data: basket });
	} catch (err) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};

// edit items inside the basket==============================================
export const editItemsInBasket = async (req, res) => {
	try {
		const { userId, quantity, productId } = req.body;
		const token = req.headers.authorization;

		const decodedToken = jwt.decode(token);
		const tokenId = decodedToken.id;

		if (tokenId !== userId) {
			return res
				.status(HTTP_RESPONSE.UNAUTHORIZED.CODE)
				.json(HTTP_RESPONSE.UNAUTHORIZED.MESSAGE);
		}

		let basket = await Basket.findOne({ userId });

		// remove the item if the quantity is zero
		if (quantity <= 0) {
			basket.items = basket.items.filter(
				(item) => item.productId.toString() !== productId
			);

			basket = await basket.save();
			// Send the basket as the response
			res.status(HTTP_RESPONSE.OK.CODE).json({ data: basket });
		} else {
			// find the item
			let foundItem = basket.items.find((item) => {
				return item.productId.toString() === productId;
			});

			// update the quantity of the item
			foundItem.quantity = quantity;

			basket = await basket.save();

			// Send the basket as the response
			res.status(HTTP_RESPONSE.OK.CODE).json({ data: basket });
		}
	} catch (err) {
		res
			.status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
			.json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
	}
};
