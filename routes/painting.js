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

const router = express.Router();

// Attach all routes
router.get("/", getAllPaintings).post("/", addPainting);
router
  .get("/:id", getParticularPainting)
  .patch("/:id", editParticularPainting)
  .delete("/:id", deleteParticularPainting);

export default router;
