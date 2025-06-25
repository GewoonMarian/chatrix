import express from "express";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

const messageRouter = express.Router();

messageRouter.get("/users", authMiddleware, getUsersForSidebar);
messageRouter.get("/:id", authMiddleware, getMessages);
messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
