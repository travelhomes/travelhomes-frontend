"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Image, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  time: string;
}

interface ChatUser {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  image: string;
}

export function ChatContent() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const chatUsers: ChatUser[] = [
    {
      id: 1,
      name: "Elmer Laverty",
      lastMessage: "Lorem Ipsum",
      time: "12m",
      image: "https://pbs.twimg.com/profile_images/1823042369739988992/Aa0ikaIu_400x400.jpg"
    },
    {
      id: 2,
      name: "Elmer Laverty",
      lastMessage: "Lorem Ipsum",
      time: "12m",
      image: "https://pbs.twimg.com/profile_images/1897858917507776512/TRVTyKFk_400x400.jpg"
    },
    {
      id: 3,
      name: "Elmer Laverty",
      lastMessage: "Lorem Ipsum",
      time: "12m",
      image: "https://pbs.twimg.com/profile_images/1850483082521956352/y96FQd6I_400x400.jpg"
    },
    {
        id: 4,
        name: "Elmer Laverty",
        lastMessage: "Lorem Ipsum",
        time: "12m",
        image: "https://pbs.twimg.com/profile_images/1861400948985487360/syN8YAQA_400x400.jpg"
      },
      {
        id: 5,
        name: "Elmer Laverty",
        lastMessage: "Lorem Ipsum",
        time: "12m",
        image: "https://pbs.twimg.com/profile_images/1775927507855998976/v1mOCezH_400x400.jpg"
      }
  ];

  const messages: Message[] = [
    { id: 1, text: "How are you?", sender: "other", time: "12m" },
    { id: 2, text: "just ideas for next time", sender: "other", time: "12m" },
    { id: 3, text: "I'll be there in 2 mins❤️", sender: "user", time: "12m" },
    { id: 4, text: "woohoooo", sender: "other", time: "12m" },
    { id: 5, text: "Haha oh man", sender: "user", time: "12m" },
    { id: 6, text: "Haha that's terrifying😂", sender: "user", time: "12m" },
    { id: 7, text: "aww", sender: "other", time: "12m" },
    { id: 8, text: "omg, this is amazing", sender: "other", time: "12m" },
    { id: 9, text: "woohoooo🔥", sender: "other", time: "12m" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message handling logic here
      setNewMessage("");
    }
  };

  return (
    <div className={`${plusJakartaSans.className} bg-white h-full flex`}>
      {/* Chat List */}
      <div className="w-[400px] border-r flex flex-col">
        {/* Tabs */}
        <div className="p-5">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                activeTab === "all"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Message
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${
                activeTab === "unread"
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-600"
              }`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chatUsers.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={chat.image}
                    alt={chat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{chat.name}</h3>
                    <span className="text-sm text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {/* Selected Chat Header */}
        <div className="p-5 border-b">
          <h2 className="text-lg font-medium">Elmer Laverty</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } items-end gap-2`}
            >
              {message.sender === "other" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="https://pbs.twimg.com/profile_images/1775927507855998976/v1mOCezH_400x400.jpg"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-[30px] h-[56px] border border-gray-200 pr-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-gray-600"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-black hover:bg-gray-900 p-3.5 h-[50px] w-[50px] rounded-full"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 