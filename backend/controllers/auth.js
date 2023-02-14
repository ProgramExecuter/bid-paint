// Import files-functions
import User from "../models/user.js";
import { hashPassword, createJWT } from "../utils/utils.js";

/**
 * @description Login User
 * @Steps -
 * 1. Check if 'username' and 'password' are present.
 * 2. Fetch the user from DB.
 * 3. Compare the passed password with crypted password in DB.
 * 4. If all goes well, then create and return a JWT.
 */
const loginUser = (req, res) => {
  res.status(200).json("Login User");
};

/**
 * @description Register User
 * @Steps -
 * 1. Check if 'username' and 'password' are present.
 * 2. Hash the password, and save the details in DB.
 * 3. If all goes well, then create and return a JWT.
 */
const registerUser = async (req, res) => {
  // Check if username and password are present
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "Username and Password are required.",
    });
  }

  // Hash the password
  req.body.password = hashPassword(req.body.password);

  // Create new User and save it in DB
  const newUser = new User(req.body);
  await newUser.save();

  // Create a JsonWebToken for this login(signup)
  const token = createJWT(
    { _id: newUser._id, username: newUser.username },
    { expiresIn: "3d" }
  );

  // Return the result
  res.status(200).json({ success: true, jwt: token });
};

export { loginUser, registerUser };
