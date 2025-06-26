import { createContext, useEffect, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // Fetch chat users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load users"
      );
    }
  };

  // Fetch chat history with selected user
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
        console.log("Loaded messages for user:", data.messages);
        // Optional: mark all as seen when messages are loaded
        // await axios.put(`/api/messages/mark-all/${userId}`);
        setUnseenMessages((prev) => {
          const updated = { ...prev };
          delete updated[userId];
          return updated;
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to load messages"
      );
    }
  };

  // Send message
  const sendMessage = async (messageData) => {
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Message failed"
      );
    }
  };

  // Subscribe to incoming messages
  const subscribeToMessages = () => {
    if (!socket || !socket.connected) {
      console.warn("Socket not connected yet");
      return;
    }

    // Prevent multiple listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prevUnseenMessages) => ({
          ...prevUnseenMessages,
          [newMessage.senderId]: prevUnseenMessages[newMessage.senderId]
            ? prevUnseenMessages[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // Unsubscribe on cleanup
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  // Re-subscribe on socket or selected user change
  useEffect(() => {
    if (!socket) return;

    if (socket.connected) {
      subscribeToMessages();
    } else {
      console.log("Socket not connected, waiting for connect event");

      const onConnect = () => {
        subscribeToMessages();
      };

      socket.on("connect", onConnect);

      // Clean up listener on unmount or socket change
      return () => {
        socket.off("connect", onConnect);
        unsubscribeFromMessages();
      };
    }

    // Also clean up if socket.connected was true
    return () => {
      unsubscribeFromMessages();
    };
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
