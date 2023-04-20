import { Schema, model } from "mongoose";

const auctionSchema = new Schema({
  painting: {
    type: Schema.Types.ObjectId,
    ref: "Painting",
    required: [true, "Painting is required"],
  },
  bids: [
    {
      username: {
        type: String,
        required: [true, "Username is required"],
      },
      bidAmount: {
        type: Number,
        required: [true, "Bid amount is required"],
      },
    },
  ],
});

export default model("Auction", auctionSchema);
