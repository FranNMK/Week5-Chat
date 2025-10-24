import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import ChatLayout from "./components/ChatLayout";

export default function App() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Week 5 • Realtime Chat</h1>
            <p className="text-slate-400 text-xs">
              MERN • Clerk Auth • Tailwind UI
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <span className="text-slate-300 text-sm">
                  {user?.firstName || user?.username || user?.id}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 bg-chat-gradient">
        <div className="mx-auto max-w-6xl h-[calc(100vh-80px)] py-4">
          <SignedOut>
            <div className="text-center text-slate-200 mt-24">
              <p className="text-lg font-semibold">Please sign in to start chatting 👇</p>
            </div>
          </SignedOut>

          <SignedIn>
            {/* Pass the current user's id + avatar into the chat layout */}
            <ChatLayout
              currentUserId={user?.id}
              currentAvatar={user?.imageUrl}
              currentName={user?.firstName || user?.username || "You"}
            />
          </SignedIn>
        </div>
      </main>
    </div>
  );
}
