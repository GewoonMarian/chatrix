import User from "../models/User.js";
import Message from "../models/Message.js";

// Get all users except the current user
export const getUsersForSidebar = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const users = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    //  Count unread messages
    const unreadCounts = {};
    const promises = users.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: currentUserId,
        seen: false,
      });
      if (messages.length > 0) {
        unreadCounts[user._id] = messages.length;
      }
    });
    await Promise.all(promises);

    res.status(200).json({ success: true, users, unreadCounts });
  } catch (error) {
    console.log("Error fetching users for sidebar:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
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
    console.log("Error fetching messages:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
