import { Schema, model } from "mongoose";

const auctionSchema = new Schema({
  painting: {
    type: Schema.Types.ObjectId,
    ref: "Painting",
    required: [true, "Painting is required"],
  },
  bids: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      bidAmount: {
        type: Number,
        required: [true, "Bid amount is required"],
      },
    },
  ],
});

export default model("Auction", auctionSchema);
