// Import files-functions
import User from "../models/user.js";

export const getParticularUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) throw Error();

    res.status(200).json({ success: true, foundUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
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
    console.log(err.message, " on Route ", "'PATCH /user/:id'");
    res.status(400).json({ success: false, error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) throw Error();

    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err.message, " on Route ", "'DELETE /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};
