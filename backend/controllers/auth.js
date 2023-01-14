import User from "../models/user.js";

// Logic for logging-in User
const loginUser = (req, res) => {
  res.status(200).json("Login User");
};

// Logic for registering User
const registerUser = async (req, res) => {
  try {
    // Check if username and password are present, if any not present, return error
    if (!req.body.username || !req.body.password)
      res
        .status(400)
        .json({ success: false, error: "Username and Password required" });

    // Create new user
    const newUser = new User(req.body);

    // Save in DB
    await newUser.save();

    // Send back the response
    res.status(201).json({ success: true, data: newUser });
  } catch (err) {
    // Send the error
    res.status(500).json({ success: false, error: err.message });
  }
};

export { loginUser, registerUser };
