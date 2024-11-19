import { Router } from "express";

import { addItemsToBasket, getItemsFromBasket, editItemsInBasket } from "../controllers/basket.js";

import { isLoggedIn } from "../middleware.js";

const router = Router();

router.post("/", isLoggedIn, addItemsToBasket);
router.get("/:userId", isLoggedIn, getItemsFromBasket);
router.patch("/:productId", isLoggedIn, editItemsInBasket);

export default router;
