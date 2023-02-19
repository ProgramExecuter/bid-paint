// Import packages
import express from "express";

// Import files-functions
import { addPainting, getPaintings } from "../controllers/painting.js";

const router = express.Router();

// Painting Routes
router.get("/", getPaintings);
router.post("/", addPainting);

export default router;
