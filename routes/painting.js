// Import packages
import express from "express";

// Import files-functions
import { getAllPaintings } from "../controllers/painting.js";

const router = express.Router();

router.get("/", getAllPaintings);

export default router;
