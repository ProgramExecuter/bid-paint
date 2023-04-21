// Import packages
import express from "express";

// Import files-functions
import {
  getParticularUser,
  editUserDetails,
  deleteUser,
} from "../controllers/user.js";

const router = express.Router();

// Attach routes
router.get("/:id", getParticularUser);
router.patch("/:id", editUserDetails);
router.delete("/:id", deleteUser);

export default router;
