import { Router } from "express";

import { makeOffer } from "../controllers/makeoffer.js";

const router = Router();

router.post("/", makeOffer);

export default router;