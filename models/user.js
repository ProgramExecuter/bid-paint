import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: String,
  status: String,
});

export default model("User", userSchema);
