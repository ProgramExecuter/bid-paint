// Import packages
import express from "express";

// Import files-functions
import {
  getParticularUser,
  editUserDetails,
  deleteUser,
  updatePassword,
} from "../controllers/user.js";
import { isAuthenticated } from "../utils/authUtils.js";

const router = express.Router();

// Attach routes
router.get("/:id", getParticularUser);
router.patch("/:id", isAuthenticated, editUserDetails);
router.delete("/:id", isAuthenticated, deleteUser);
router.patch("/:id/updatePassword", updatePassword);

export default router;
