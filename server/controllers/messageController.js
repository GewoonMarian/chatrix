import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { io, connectedUsers } from "../server.js";

// Get all users except the current user
export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    //  Count unseen messages
    const unseenMessages = {};
    const promises = users.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: currentUserId,
        seen: false,
      });
      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);

    res.status(200).json({ success: true, users, unseenMessages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users for sidebar:",
      error: error.message,
    });
  }
};

// Get messages for selected user
export const getMessages = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user._id;

    // Fetch messages between the current user and the selected user
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 });

    // Mark messages as seen if they are from the selected user
    await Message.updateMany(
      { senderId: userId, receiverId: currentUserId, seen: false },
      { $set: { seen: true } }
    );

    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages:",
      error: error.message,
    });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload image to Cloudinary
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
    });

    // Save the message to the database
    await newMessage.save();

    // Emit the new message to the receiver if they are online
    const receiverSocketId = connectedUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message:",
      error: error.message,
    });
  }
};

// Mark messages as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user._id;

    // Update messages from the selected user to the current user as seen
    const result = await Message.updateMany(
      { senderId: userId, receiverId: currentUserId, seen: false },
      { $set: { seen: true } }
    );

    res
      .status(200)
      .json({ success: true, message: "Messages marked as seen", result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error marking messages as seen:",
      error: error.message,
    });
  }
};
