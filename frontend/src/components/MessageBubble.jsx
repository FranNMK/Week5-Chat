export default function MessageBubble({ message, isMe, avatarUrl }) {
  return (
    <div className={`flex items-start gap-3 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && (
        <img
          src={avatarUrl || "https://placehold.co/32x32?text=?"}
          className="h-8 w-8 rounded-full border border-slate-300 object-cover"
        />
      )}

      <div className={`max-w-xs rounded-lg px-3 py-2 text-sm leading-relaxed shadow
        ${isMe ? "bg-bubbleMe text-white" : "bg-bubbleOther text-slate-800 border border-slate-300"}`}>
        <div>{message.text}</div>
        <div className={`text-[10px] mt-1 ${isMe ? "text-indigo-200" : "text-slate-500"}`}>
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>

      {isMe && (
        <img
          src={avatarUrl || "https://placehold.co/32x32?text=U"}
          className="h-8 w-8 rounded-full border border-indigo-400 object-cover"
        />
      )}
    </div>
  );
}
