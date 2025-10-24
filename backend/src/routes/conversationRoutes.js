const express = require("express");
const Conversation = require("../models/Conversation");
const UserProfile = require("../models/UserProfile");
const router = express.Router();

/**
 * GET /api/conversations?userId=XXX
 * Returns all conversations this user is part of.
 */
router.get("/", async (req, res) => {
  const { userId } = req.query; // Clerk user id from frontend
  if (!userId) {
    return res.status(400).json({ message: "userId required" });
  }

  // find conversations that include this userId
  const convos = await Conversation.find({ members: userId }).sort({ updatedAt: -1 });

  // We'll also try to return the "other" user's profile for each convo for UI
  const data = [];

  for (const convo of convos) {
    const otherUserId = convo.members.find(m => m !== userId);

    // Try to attach profile info for sidebar UI
    let otherProfile = null;
    if (otherUserId) {
      otherProfile = await UserProfile.findOne({ clerkUserId: otherUserId });
    }

    data.push({
      _id: convo._id,
      members: convo.members,
      lastUpdated: convo.updatedAt,
      otherUser: otherProfile
        ? {
            clerkUserId: otherProfile.clerkUserId,
            displayName: otherProfile.displayName,
            avatarUrl: otherProfile.avatarUrl
          }
        : null
    });
  }

  res.json(data);
});

/**
 * POST /api/conversations
 * body: { userId, targetUserId }
 * Creates or returns existing conversation between these two users.
 */
router.post("/", async (req, res) => {
  const { userId, targetUserId } = req.body;
  if (!userId || !targetUserId) {
    return res.status(400).json({ message: "userId and targetUserId required" });
  }

  // Check if conversation already exists between these two
  let convo = await Conversation.findOne({
    members: { $all: [userId, targetUserId], $size: 2 }
  });

  if (!convo) {
    convo = await Conversation.create({
      members: [userId, targetUserId]
    });
  }

  res.status(201).json(convo);
});

module.exports = router;
