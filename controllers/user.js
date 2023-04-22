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
    if (req.params.id != res.locals.user.id)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    const editDetails = { status: req.body.status, name: req.body.name };

    const editedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: editDetails },
      { returnDocument: "after" }
    );

    res.status(200).json({ success: true, editedUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'PATCH /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id != res.locals.user.id)
      return res.status(401).json({ success: false, error: "Unauthorized" });

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) throw Error();

    res.status(200).json({ success: true, deletedUser });
  } catch (err) {
    console.log(err.message, " on Route ", "'DELETE /user/:id'");
    res.status(404).json({ success: false, error: "Not Found" });
  }
};
