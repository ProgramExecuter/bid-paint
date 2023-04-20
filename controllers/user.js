// Import files-functions
import User from "../models/user.js";

export const getParticularUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) throw Error();

    res.status(200).json(foundUser);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};

export const userSignup = (req, res) => {
  res.status(200).json("POST /user/signup");
};

export const userLogin = (req, res) => {
  res.status(200).json("POST /user/login");
};

export const editUserDetails = (req, res) => {
  res.status(200).json("PATCH /user/:id");
};
