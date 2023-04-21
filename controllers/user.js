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

export const editUserDetails = async (req, res) => {
  try {
    const { username, ...data } = req.body;

    const editedUserDetails = await User.findByIdAndUpdate(
      req.params.id,
      { $set: data },
      { returnDocument: "after" }
    );

    res.status(200).json(editedUserDetails);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) throw Error();

    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(404);
  }
};
