import { Schema, model } from "mongoose";

const paintingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: [true, "This title is already taken"],
  },
  picUrl: {
    type: String,
    required: [true, "picture is required"],
  },
  description: String,
  username: String,
});

export default model("Painting", paintingSchema);
