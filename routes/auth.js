// Import packages
import express from "express";

// Import files-functions
import { userLogin, userSignup } from "../controllers/auth.js";

const router = express.Router();

// Attach routes
router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
