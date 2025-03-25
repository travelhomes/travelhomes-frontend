'use client';

import { Sidebar, Header } from "@/components/dashboard";
import { ChatContent } from "@/components/dashboard/content/ChatContent";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title="Chat" />
        <main className="flex-1 overflow-auto bg-[#F9FAFB] px-6">
          <ChatContent />
        </main>
      </div>
    </div>
  );
} 