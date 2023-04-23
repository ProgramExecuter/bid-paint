// Import packages
import bcrypt from "bcryptjs";

// Import files-functions
import User from "../models/user.js";
import {
  generateJwt,
  encryptPassword,
  comparePassword,
} from "../utils/authUtils.js";

export const userSignup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password)
      throw Error("Username and Password are required");

    // Encrypt the password
    const encryptedPassword = encryptPassword(req.body.password, 8);
    req.body.password = encryptedPassword;

    const newUser = new User(req.body);

    newUser.token = generateJwt({
      username: req.body.username,
      id: newUser._id,
    });

    await newUser.save();

    res.status(200).json({ success: true, user: newUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /auth/signup'");
    res.status(400).json({ success: false, error: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) throw Error();

    const foundUser = await User.findOne({ username: req.body.username });

    if (!foundUser) throw Error();

    // Compare the normal and hashed password
    const passwordMatch = comparePassword(
      req.body.password,
      foundUser.password
    );

    if (!passwordMatch) {
      throw Error();
    } else {
      foundUser.token = generateJwt({
        username: foundUser.username,
        id: foundUser._id,
      });

      await foundUser.save();

      res.status(200).json({ success: true, user: foundUser });
    }
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /auth/login'");
    res
      .status(401)
      .json({ success: false, error: "Username or Password incorrect" });
  }
};
