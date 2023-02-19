import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already taken"],
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("user", userSchema);
