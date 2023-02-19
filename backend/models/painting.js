import mongoose from "mongoose";

const paintingSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: String,
  owner: String,
});

export default mongoose.model("painting", paintingSchema);
