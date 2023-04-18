// Import packages
import express from "express";

// Import files-functions
import {
  getAllAuctions,
  createAuction,
  getParticularAuction,
  makeBidOnAuction,
} from "../controllers/auction.js";

const router = express.Router();

// Attach all routes
router.get("/", getAllAuctions);
router.post("/", createAuction);
router.get("/:id", getParticularAuction);
router.post("/:id/makeBid", makeBidOnAuction);

export default router;
