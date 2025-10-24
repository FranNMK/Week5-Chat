import { useEffect, useState } from "react";
import { ConversationsAPI } from "../lib/api";

export default function Sidebar({ currentUserId, onSelectConversation, activeConversationId }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!currentUserId) return;
    (async () => {
      const data = await ConversationsAPI.listForUser(currentUserId);
      setConversations(data);
    })();
  }, [currentUserId]);

  return (
    <aside className="bg-sidebar text-slate-200 w-64 rounded-xl h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          Conversations
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <p className="p-4 text-slate-500 text-sm">No chats yet.</p>
        )}

        {conversations.map(convo => {
          const other = convo.otherUser;
          return (
            <button
              key={convo._id}
              onClick={() => onSelectConversation(convo._id, other)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sidebarHover
                ${activeConversationId === convo._id ? "bg-sidebarHover" : ""}`}
            >
              <img
                src={other?.avatarUrl || "https://placehold.co/40x40?text=?"}
                alt={other?.displayName || "User"}
                className="h-10 w-10 rounded-full object-cover border border-slate-600"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-white leading-tight">
                  {other?.displayName || other?.clerkUserId || "Unknown User"}
                </div>
                <div className="text-[11px] text-slate-400 leading-tight truncate">
                  Last updated {new Date(convo.lastUpdated || Date.now()).toLocaleString()}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
