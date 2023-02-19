// Import packages
import express from "express";

// Import files-functions
import { getPaintings } from "../controllers/painting.js";

const router = express.Router();

// Painiting Route
router.get("/", getPaintings);

export default router;
