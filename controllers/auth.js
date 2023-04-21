// Import packages
import bcrypt from "bcryptjs";

// Import files-functions
import User from "../models/user.js";
import { generateJwt } from "../utils/authUtils.js";

export const userSignup = async (req, res) => {
  try {
    req.body.token = generateJwt({ username: req.body.username });

    // Encrypt the password
    const encryptedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = encryptedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    if (!req.body.username)
      return res.status(401).json("Username or password incorrect.");

    const foundUser = await User.findOne({ username: req.body.username });

    // Compare the normal and hashed password
    const passwordMatch = bcrypt.compareSync(
      req.body.password,
      foundUser.password
    );

    if (!foundUser || !passwordMatch) {
      res.status(401).json("Username or password incorrect.");
    } else {
      foundUser.token = generateJwt({ username: foundUser.username });
      await foundUser.save();

      res.status(200).json(foundUser);
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
