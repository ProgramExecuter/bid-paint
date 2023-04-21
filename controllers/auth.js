// Import files-functions
import User from "../models/user.js";

export const userSignup = async (req, res) => {
  try {
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

    if (!foundUser || req.body.password !== foundUser.password) {
      res.status(401).json("Username or password incorrect.");
    } else {
      res.status(200).json("Login successfull");
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};
