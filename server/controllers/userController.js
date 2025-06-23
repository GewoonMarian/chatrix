import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// Register a new user
export const signup = async (req, res) => {
  const { fullName, email, password, profilePic, bio } = req.body;

  try {
    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profilePic: profilePic || null,
      bio: bio || null,
    });
    const token = generateToken(newUser);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser, token });
  } catch (error) {
    console.log("Error creating user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.log("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify user is authenticated
export const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};
