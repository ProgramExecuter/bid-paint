// Import packages
import express from "express";

// Import files-functions
import {
  getAllAuctions,
  createAuction,
  getParticularAuction,
  makeBidOnAuction,
} from "../controllers/auction.js";
import { isAuthenticated } from "../utils/authUtils.js";

const router = express.Router();

// Attach all routes
router.get("/", getAllAuctions);
router.post("/", isAuthenticated, createAuction);
router.get("/:id", getParticularAuction);
router.post("/:id/makeBid", isAuthenticated, makeBidOnAuction);

export default router;
