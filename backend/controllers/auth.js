// Import files-functions
import User from "../models/user.js";
import { hashPassword, createJWT } from "../utils/utils.js";

///////////////////////////
///  LOGIN USER
//////////////////////////
const loginUser = (req, res) => {
  res.status(200).json("Login User");
};

///////////////////////////
///  REGISTER USER
//////////////////////////
// Steps as follows -
//   1. Check if 'username' and 'password' are present
//   2. Hash the password
//   3. Create the new user and save it in DB
const registerUser = async (req, res) => {
  // Check if username and password are present
  if (!req.body.username || !req.body.password)
    return res.status(400).json({
      success: false,
      message: "Username and Password are required.",
    });

  // Hash the password
  req.body.password = hashPassword(req.body.password);

  // Create new User and save it in DB
  const newUser = new User(req.body);
  await newUser.save();

  // Create a JsonWebToken for this login(signup), and return it
  const token = createJWT({
    _id: newUser._id,
    username: newUser.username,
  });

  // Return the result
  res.status(200).json({ success: true, token });
};

export { loginUser, registerUser };
