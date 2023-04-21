// Import packages
import express from "express";

// Import files-functions
import {
  getParticularUser,
  editUserDetails,
  deleteUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../utils/authUtils.js";

const router = express.Router();

// Attach routes
router.get("/:id", getParticularUser);
router.patch("/:id", isAuthenticated, editUserDetails);
router.delete("/:id", isAuthenticated, deleteUser);

export default router;
