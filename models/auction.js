import mongoose, { Schema, Model } from "mongoose";

const auctionSchema = new Schema({
  painting: {
    type: mongoose.Types.ObjectId,
    ref: "Painting",
  },
  bids: [
    {
      username: [String, "Username is required"],
      bidAmount: [Number, "Bid amount is required"],
    },
  ],
});

export default Model("Auction", auctionSchema);
