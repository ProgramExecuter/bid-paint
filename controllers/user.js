// Import files-functions
import User from "../models/user.js";

export const getParticularUser = async (req, res) => {
  console.log(req.params.id);
  try {
    console.log("Hello");
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) throw Error();

    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

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

export const editUserDetails = (req, res) => {
  res.status(200).json("PATCH /user/:id");
};
