import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Initialize express app and server
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "4mb" }));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

await connectDB();

// user routes
app.use("/api/auth", userRouter);

// message routes
app.use("/api/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
