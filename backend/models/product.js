import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true },
	category: { type: String, required: true },
	quanitity: {type: String, required: true },
	img: { type: String, required: true },
	location: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	username: { type: String, required: true } 
});

export const Product = mongoose.model("Product", productSchema);
