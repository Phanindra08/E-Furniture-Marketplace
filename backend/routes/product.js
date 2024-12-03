import { Router } from "express";
import { isLoggedIn } from "../middleware.js";
import { getAllProducts, getSearchValue, addProduct, getMyProducts, updateProductById, markAsSold, deleteProductById, getProductById } from "../controllers/product.js";

import {upload} from "../middleware/uploadMiddleware.js";
import {Product} from "../models/product.js";

const router = Router();


router.get("/myProducts", isLoggedIn ,getMyProducts);
router.get("/:searchvalue", getSearchValue);
router.get("/", getAllProducts);

router.get("/getProduct/:productId", getProductById);

router.put("/updateProduct/:productId", isLoggedIn, upload.single("img"), updateProductById);
router.delete("/deleteProduct/:productId", isLoggedIn, deleteProductById);
router.post("/addProduct", isLoggedIn, upload.single("img"), addProduct);


export default router;