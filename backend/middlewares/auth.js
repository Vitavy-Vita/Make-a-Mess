import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/usersModels.js";

dotenv.config();

export const isLogged = (req, res, next) => {
  let authToken = req.headers.authorization;
  // authorization token in the header being preceded by "Bearer", split with a blank space and go to the index [1] to target the token
  let token = authToken && authToken.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "You are not logged in",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAuthorized = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Unauthorized access",
      });
    }
    next();
  };
};
