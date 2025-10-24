import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout({
  currentUserId,
  currentAvatar,
  currentName
}) {
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeOtherUser, setActiveOtherUser] = useState(null);

  function handleSelectConversation(convoId, otherUser) {
    setActiveConversationId(convoId);
    setActiveOtherUser(otherUser);
  }

  return (
    <div className="h-full flex gap-4">
      {/* Sidebar */}
      <Sidebar
        currentUserId={currentUserId}
        onSelectConversation={handleSelectConversation}
        activeConversationId={activeConversationId}
      />

      {/* Chat */}
      <ChatWindow
        conversationId={activeConversationId}
        currentUserId={currentUserId}
        currentAvatar={currentAvatar}
        otherUser={activeOtherUser}
        currentName={currentName}
      />
    </div>
  );
}
