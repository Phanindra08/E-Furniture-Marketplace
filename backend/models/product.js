import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price:  {type: Number, 
    required: true, 
    validate: {
        validator: Number.isInteger, // Ensures the category value is an integer
        message: '{VALUE} is not a valid integer'
    }},
    category: { type: String, required: true },
    img: {
        data: Buffer, // Binary data for the image
        contentType: String, // MIME type (e.g., image/jpeg, image/png)
    },
    location: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sold: {type: Boolean, required: true}
});

export const Product = mongoose.model("Product", productSchema);
