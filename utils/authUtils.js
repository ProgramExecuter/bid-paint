// Import packages
import jwt from "jsonwebtoken";

export const generateJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });
};

export const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw Error("Unauthorized");

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (!decodedToken || !decodedToken.username) throw Error("Unauthorized");

    const foundUser = await User.findById(decoded.id);

    if (!foundUser) throw Error("Unauthorized");

    // To pass on the username of token
    res.locals.user = { username: decodedToken.username, id: decodedToken.id };

    next();
  } catch (err) {
    res.status(401).json(err.message);
  }
};
