import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const client = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" }
});

// Conversations
export const ConversationsAPI = {
  listForUser: async (userId) => {
    const res = await client.get("/api/conversations", {
      params: { userId }
    });
    return res.data;
  },
  startConversation: async ({ userId, targetUserId }) => {
    const res = await client.post("/api/conversations", {
      userId,
      targetUserId
    });
    return res.data;
  }
};

// Messages
export const MessagesAPI = {
  list: async (conversationId) => {
    const res = await client.get("/api/messages", {
      params: { conversationId }
    });
    return res.data;
  },
  send: async ({ conversationId, senderId, text }) => {
    const res = await client.post("/api/messages", {
      conversationId,
      senderId,
      text
    });

    // here we will also emit socket.io "sendMessage"
    return res.data;
  }
};
