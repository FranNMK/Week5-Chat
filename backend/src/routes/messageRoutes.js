const express = require("express");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const router = express.Router();

/**
 * GET /api/messages?conversationId=XYZ
 * Returns all messages in that conversation.
 */
router.get("/", async (req, res) => {
  const { conversationId } = req.query;
  if (!conversationId) {
    return res.status(400).json({ message: "conversationId required" });
  }

  const msgs = await Message.find({ conversationId }).sort({ createdAt: 1 });
  res.json(msgs);
});

/**
 * POST /api/messages
 * body: { conversationId, senderId, text }
 * Saves message and bumps conversation updatedAt.
 */
router.post("/", async (req, res) => {
  const { conversationId, senderId, text } = req.body;
  if (!conversationId || !senderId || !text) {
    return res.status(400).json({ message: "conversationId, senderId, text required" });
  }

  const newMsg = await Message.create({ conversationId, senderId, text });

  // bump conversation updatedAt so it floats to top in sidebar
  await Conversation.findByIdAndUpdate(conversationId, { updatedAt: new Date() });

  // SOCKET.IO HOOK (LATER):
  // io.to(conversationId).emit("newMessage", newMsg)

  res.status(201).json(newMsg);
});

module.exports = router;
