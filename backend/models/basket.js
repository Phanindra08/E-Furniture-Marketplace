import mongoose from "mongoose";
const { Schema } = mongoose;

const basketSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User" },
	items: [
		{
			productId: { type: Schema.Types.ObjectId, ref: "Product" },
			quantity: { type: Number, required: true },
		},
	],
});

export const Basket = mongoose.model("Basket", basketSchema);
