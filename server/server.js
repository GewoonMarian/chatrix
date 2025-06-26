import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Initialize express app and server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Initialize Socket.IO
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Store connected users
export const connectedUsers = {}; //{ userId: socketId }

// Handle Socket.IO connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) connectedUsers[userId] = socket.id;

  // Emit online users to all clients
  io.emit("getOnlineUsers", Object.keys(connectedUsers));

  // Handle user disconnection
  socket.on("disconnect", () => {
    delete connectedUsers[userId];
    io.emit("getOnlineUsers", Object.keys(connectedUsers));
  });
});

// Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

await connectDB();

// user routes
app.use("/api/auth", userRouter);

// message routes
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
