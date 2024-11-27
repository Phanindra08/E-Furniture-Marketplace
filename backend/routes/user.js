import { Router } from "express";

import { registerUser, loginUser, getUserById, updateUserDetails } from "../controllers/user.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details/:id", getUserById);
router.put("/updateProfile", updateUserDetails);

export default router;