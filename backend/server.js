import "dotenv/config";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from 'cors';
import userRouter from "./routes/user.js";
import initProductRouter from "./routes/init.js";
import featuredItemsRouter from "./routes/featuredItems.js";
import productsRouter from "./routes/product.js";
import basketRouter from "./routes/basket.js";
import makeOfferRouter from "./routes/makeoffer.js"

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL;
const mongoUrl = process.env.MONGO_URI;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/user", userRouter);
app.use("/init", initProductRouter);
app.use("/featuredItems", featuredItemsRouter);
app.use("/products", productsRouter);
app.use("/basket", basketRouter);
app.use("/makeOffer",makeOfferRouter);


// Connect to MongoDB Atlas database
mongoose
	.connect(mongoUrl)
	.then(() => {
		console.log("Connected to MongoDB Atlas database");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB Atlas database:", error);
	});
	
// connect to the server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
