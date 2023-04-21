// Import packages
import express from "express";

// Import files-functions
import paintingRoutes from "./painting.js";
import auctionRoutes from "./auction.js";
import userRoutes from "./user.js";
import authRoutes from "./auth.js";

const router = express.Router();

// Attaching routes
router.use("/painting", paintingRoutes);
router.use("/auction", auctionRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
