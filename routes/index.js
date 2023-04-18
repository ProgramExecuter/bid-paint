// Import packages
import express from "express";

// Import files-functions
import paintingRoutes from "./painting.js";

const router = express.Router();

// Attaching routes
router.use("/painting", paintingRoutes);

export default router;
