// Import packages
import bcrypt from "bcryptjs";

// Import files-functions
import User from "../models/user.js";

///////////////////////////
///  LOGIN USER
//////////////////////////
const loginUser = (req, res) => {
  res.status(200).json("Login User");
};

///////////////////////////
///  REGISTER USER
//////////////////////////
const registerUser = async (req, res) => {
  res.status(200).json("Signup User");
};

export { loginUser, registerUser };
