// Import packages
import express from "express";

// Import files-functions
import {
  addPainting,
  deleteParticularPainting,
  editParticularPainting,
  getAllPaintings,
  getParticularPainting,
} from "../controllers/painting.js";
import { isAuthenticated } from "../utils/authUtils.js";

const router = express.Router();

// Attach all routes
router.get("/", getAllPaintings).post("/", isAuthenticated, addPainting);
router
  .get("/:id", getParticularPainting)
  .patch("/:id", isAuthenticated, editParticularPainting)
  .delete("/:id", isAuthenticated, deleteParticularPainting);

export default router;
