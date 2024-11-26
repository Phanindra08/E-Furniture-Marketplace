import { Router } from "express";
import { isLoggedIn } from "../middleware.js";
import { getAllProducts, getSearchValue, addProduct, getMyProducts, updateProductById, markAsSold } from "../controllers/product.js";

const router = Router();


router.get("/myProducts", isLoggedIn ,getMyProducts);
router.get("/:searchvalue", getSearchValue);
router.get("/", getAllProducts);
router.post("/addProduct",isLoggedIn, addProduct);
router.put("/updateProduct/:productId", isLoggedIn, updateProductById);
router.put("/markAsSold", isLoggedIn, markAsSold);

export default router;