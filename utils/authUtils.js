// Import packages
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Import files-functions
import User from "../models/user.js";

export const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
};

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error("Unauthorized");

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (!decodedToken || !decodedToken.username || !decodedToken.id)
      throw Error("Unauthorized");

    const foundUser = await User.findById(decodedToken.id);

    if (!foundUser) throw Error("Unauthorized");

    // To pass on the username of token to next middleware/controller
    res.locals.user = { username: decodedToken.username, id: decodedToken.id };

    next();
  } catch (err) {
    console.log(err.message, " from 'isAuthenticated' middleware");
    res.status(401).json({ success: false, error: err.message });
  }
};

export const encryptPassword = (password, saltRounds) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const comparePassword = (normalPassword, hashedPassword) => {
  return bcrypt.compareSync(normalPassword, hashedPassword);
};

export const validateUsername = (username) => {
  username = username.trim().toLowerCase();

  for (let ch of username)
    if (!((ch >= "a" && ch <= "z") || (ch >= "0" && ch <= "9") || ch == "_"))
      return null;

  return username;
};
