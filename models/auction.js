import { Schema, Types, model } from "mongoose";

const auctionSchema = new Schema({
  painting: {
    type: Types.ObjectId,
    ref: "Painting",
  },
  bids: [
    {
      username: [String, "Username is required"],
      bidAmount: [Number, "Bid amount is required"],
    },
  ],
});

export default model("Auction", auctionSchema);
