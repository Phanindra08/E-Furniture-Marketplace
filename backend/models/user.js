import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true, minlength: 3, maxlength: 30 },
	email: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 30,
		unique: true,
	},
	password: { type: String, required: true, minlength: 5, maxlength: 1024 },
});

export const User = mongoose.model("User", userSchema);
