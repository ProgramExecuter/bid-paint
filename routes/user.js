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
router.get("/:username", getParticularUser);
router.patch("/:username", isAuthenticated, editUserDetails);
router.delete("/:username", isAuthenticated, deleteUser);
router.patch("/:username/updatePassword", updatePassword);

export default router;
