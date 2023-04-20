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
router.post("/signup", userSignup).all("*", (req, res) => res.sendStatus(404));
router.post("/login", userLogin).all("*", (req, res) => res.sendStatus(404));
router.get("/:id", getParticularUser);
router.patch("/:id", editUserDetails);

export default router;
