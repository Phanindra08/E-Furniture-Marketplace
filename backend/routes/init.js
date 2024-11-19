import { Router } from "express";

import { seedProductDB } from "../controllers/init.js";

const router = Router();

router.post("/", seedProductDB);

export default router;