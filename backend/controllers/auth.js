import User from "../models/user.js";

// Logic for logging-in User
const loginUser = (req, res) => {
  res.status(200).json("Login User");
};

// Logic for registering User
const registerUser = (req, res) => {
  res.status(200).json(newUser);
};

export { loginUser, registerUser };
