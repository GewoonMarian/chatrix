// Middleware to check if the user is authenticated
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
