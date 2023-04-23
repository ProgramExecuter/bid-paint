// Import files-functions
import User from "../models/user.js";
import {
  generateJwt,
  encryptPassword,
  comparePassword,
  validateUsername,
} from "../utils/authUtils.js";

export const userSignup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password)
      throw Error("Username and Password are required");

    // Validate username
    let username = validateUsername(req.body.username);

    if (!username)
      throw Error(
        "'username' should not have spaces and should only contain " +
          "english alphabets(A-Z)(a-z) or numbers(0-9) or _"
      );

    // Encrypt the password
    const encryptedPassword = encryptPassword(req.body.password, 8);
    req.body.password = encryptedPassword;
    req.body.username = username;

    const newUser = new User(req.body);

    const token = generateJwt({
      username: req.body.username,
      id: newUser._id,
    });

    newUser.token = token;
    await newUser.save();

    // Returning user result(after filtering)
    const user = { username: newUser.username };
    if (newUser.name) user.name = newUser.name;
    if (newUser.status) user.status = newUser.status;

    res.status(200).json({ success: true, token, user });
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

    if (!passwordMatch) throw Error();

    const token = generateJwt({
      username: foundUser.username,
      id: foundUser._id,
    });

    foundUser.token = token;
    await foundUser.save();

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err.message, " on Route ", "'POST /auth/login'");
    res
      .status(401)
      .json({ success: false, error: "Username or Password incorrect" });
  }
};
