// Import files-functions
import User from "../models/user.js";
import { encryptPassword, comparePassword } from "../utils/authUtils.js";

export const getParticularUser = async (req, res) => {
  try {
    const foundUser = await User.findOne(
      { username: req.params.username },
      "username name status"
    );

    if (!foundUser) throw Error();

    res.status(200).json({ success: true, user: foundUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'GET /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const editUserDetails = async (req, res) => {
  try {
    if (req.params.username != res.locals.loginUser)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    const editDetails = { status: req.body.status, name: req.body.name };

    const editedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: editDetails },
      { returnDocument: "after", fields: "username name status" }
    );

    res.status(200).json({ success: true, user: editedUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'PATCH /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.username != res.locals.loginUser)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    const deletedUser = await User.findOneAndDelete(
      { username: req.params.username },
      { select: "username name status" }
    );

    if (!deletedUser) throw Error();

    res.status(200).json({ success: true, user: deletedUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'DELETE /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    if (!req.body.oldPassword || !req.body.newPassword) throw Error();

    const foundUser = await User.findOne({ username: req.params.username });
    if (!foundUser) throw Error();

    const oldPasswordMatch = comparePassword(
      req.body.oldPassword,
      foundUser.password
    );
    if (!oldPasswordMatch) throw Error();

    foundUser.password = encryptPassword(req.body.newPassword, 8);
    await foundUser.save();

    // Filter user details
    const { _id, username, name, status } = foundUser;
    const userDetails = { _id, username };
    if (name) userDetails.name = name;
    if (status) userDetails.status = status;

    res.status(200).json({ success: true, user: userDetails });
  } catch (err) {
    console.log(err.message, " on Route ", "'PATCH /user/:id/updatePassword'");
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
