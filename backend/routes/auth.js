// Import from packages
import express from "express";

// Import from files
import { loginUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

// Auth Routes
router.post("/login", loginUser);
router.post("/signup", registerUser);

export default router;
