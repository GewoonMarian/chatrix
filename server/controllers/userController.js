import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.log("Error creating user:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
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
    res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.log("Error logging in:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Verify user is authenticated
export const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { fullName, profilePic, bio } = req.body;
  const userId = req.user.id;
  let updateProfile = {};
  try {
    if (!profilePic) {
      updateProfile = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          bio,
        },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updateProfile = await User.findByIdAndUpdate(
        userId,
        {
          fullName,
          profilePic: upload.secure_url,
          bio,
        },
        { new: true }
      );
    }
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updateProfile,
    });
  } catch (error) {
    console.log("Error updating profile:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
