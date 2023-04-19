import mongoose, { Schema } from "mongoose";

const paintingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  picUrl: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model("Painting", paintingSchema);
