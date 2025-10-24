const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const conversationRoutes = require("./routes/conversationRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const httpServer = require("http").createServer(app)
// const { Server } = require("socket.io")

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  methods: ["GET", "POST"]
}));
app.use(express.json());

// Health
app.get("/", (req, res) => res.send("Chat API OK"));

// Routes
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// SOCKET.IO SERVER WILL GO HERE

// const io = new Server(httpServer, { cors: { origin: process.env.ALLOWED_ORIGIN } })
// io.on("connection", socket => { ... })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`💬 Chat API on http://localhost:${PORT}`);
});
