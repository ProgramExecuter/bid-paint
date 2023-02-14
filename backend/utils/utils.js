// Import packages
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hash the password and return it
export const hashPassword = (pass) => {
  const hashedPass = bcrypt.hashSync(pass, 10);
  return hashedPass;
};

// Check if normal and hashed password matches
export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// Create a Json Web Token and return it
export const createJWT = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  return token;
};
