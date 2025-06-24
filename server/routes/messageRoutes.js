import express from "express";
import {
  getMessages,
  getUsersForSidebar,
} from "../controllers/messageController.js";
import { authMiddleware } from "../middleware/auth.js";

const messageRouter = express.Router();
messageRouter.get("/users", authMiddleware, getUsersForSidebar);
messageRouter.get("/:id", authMiddleware, getMessages);

export default messageRouter;
