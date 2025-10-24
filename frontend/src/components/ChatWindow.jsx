import { useEffect, useState } from "react";
import { MessagesAPI } from "../lib/api";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  conversationId,
  currentUserId,
  currentAvatar,
  otherUser
}) {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");

  // Load messages whenever we switch conversation
  useEffect(() => {
    if (!conversationId) return;
    (async () => {
      const data = await MessagesAPI.list(conversationId);
      setMessages(data);
    })();
  }, [conversationId]);

  async function handleSend(e) {
    e.preventDefault();
    if (!draft.trim()) return;

    // Send to backend
    const newMsg = await MessagesAPI.send({
      conversationId,
      senderId: currentUserId,
      text: draft.trim()
    });

    // Add to UI immediately
    setMessages(prev => [...prev, newMsg]);
    setDraft("");

    // SOCKET.IO WILL EMIT HERE:
    // socket.emit("sendMessage", { conversationId, ... })
  }

  if (!conversationId) {
    return (
      <section className="flex-1 rounded-xl bg-white/60 backdrop-blur border border-white/30 shadow p-6 flex items-center justify-center">
        <p className="text-slate-600 text-sm">
          Select a conversation from the left to start chatting 💬
        </p>
      </section>
    );
  }

  return (
    <section className="flex-1 rounded-xl bg-white/70 backdrop-blur border border-white/30 shadow flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 p-4 flex items-center gap-3 bg-white/80 rounded-t-xl">
        <img
          src={otherUser?.avatarUrl || "https://placehold.co/40x40?text=?"}
          className="h-10 w-10 rounded-full border border-slate-300 object-cover"
        />
        <div className="flex flex-col">
          <span className="text-slate-900 font-semibold text-sm">
            {otherUser?.displayName || "Chat"}
          </span>
          <span className="text-[11px] text-slate-500">
            {otherUser?.clerkUserId || "user"}
          </span>
        </div>
      </div>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/50">
        {messages.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-10">
            No messages yet. Say hi 👋
          </p>
        )}

        {messages.map(msg => (
          <MessageBubble
            key={msg._id}
            message={msg}
            isMe={msg.senderId === currentUserId}
            avatarUrl={msg.senderId === currentUserId ? currentAvatar : otherUser?.avatarUrl}
          />
        ))}
      </div>

      {/* Composer */}
      <form onSubmit={handleSend} className="border-t border-slate-200 p-4 bg-white/80 rounded-b-xl flex gap-3">
        <input
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </section>
  );
}
