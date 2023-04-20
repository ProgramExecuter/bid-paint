// Import packages
import express from "express";

// Import files-functions
import {
  getParticularUser,
  userSignup,
  userLogin,
  editUserDetails,
} from "../controllers/user.js";

const router = express.Router();

// Attach routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/:id", getParticularUser);
router.patch("/:id", editUserDetails);

export default router;