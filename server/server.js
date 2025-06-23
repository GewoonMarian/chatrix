import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";

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
// Import routes
app.use("/api/auth", authRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
