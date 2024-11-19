import { Router } from "express";

import { getFeaturedItems } from "../controllers/featuredItems.js";

const router = Router();

router.get("/", getFeaturedItems);

export default router;