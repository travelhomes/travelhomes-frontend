"use client";

import { useState, useEffect } from "react";
import { Send, Image as ImageIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Appbar from "@/components/landingPage/appbar";
import { EmailIcon, PhoneIcon } from "@/public/assets/CustomIcon";
import { ArrowRightIcon } from "@/public/assets/CustomIcon";

interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  isUser?: boolean;
  avatar?: string;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
}

const chats: Chat[] = [
  {
    id: 1,
    name: "Elmer Laverty",
    lastMessage: "Lorem ipsum",
    timestamp: "12m",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Elmer Laverty",
    lastMessage: "Lorem ipsum",
    timestamp: "12m",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Elmer Laverty",
    lastMessage: "Lorem ipsum",
    timestamp: "12m",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Elmer Laverty",
    lastMessage: "Lorem ipsum",
    timestamp: "12m",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    content: "How are you?",
    sender: "User",
    timestamp: "12:00",
    isUser: true,
  },
  {
    id: 2,
    content: "Just ideas for next time",
    sender: "Other",
    timestamp: "12:01",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    content: "I like there in 2 mins 🫡",
    sender: "Other",
    timestamp: "12:02",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    content: "wow",
    sender: "Other",
    timestamp: "12:03",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    content: "omg, this is amazing",
    sender: "Other",
    timestamp: "12:04",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    content: "woohoooo 🎉",
    sender: "Other",
    timestamp: "12:05",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: "User",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen">
      <div className="py-4 px-4 md:px-20 border-b hidden md:block">
        <Appbar />
      </div>

      <div className="flex h-screen mx-4 md:mx-[80px]">
        {/* Sidebar - Always visible on desktop, hidden on mobile when chat is selected */}
        <div
          className={`${
            selectedChat ? "hidden md:flex" : "flex"
          } w-full md:w-[300px] border-r flex-col`}
        >
          <div className="p-4 flex justify-between">
            <h2 className="text-[28px] text-[#1C2939] font-semibold">Chat</h2>
            <div className="flex gap-2">
              <span className="cursor-pointer bg-[#EAECF0] border rounded-full p-3">
                <PhoneIcon />
              </span>
              <span className="cursor-pointer bg-[#EAECF0] border rounded-full p-3">
                <EmailIcon />
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-4 hover:bg-accent cursor-pointer"
                onClick={() => setSelectedChat(chat.id)}
              >
                <Avatar>
                  <AvatarImage src={chat.avatar} alt={chat.name} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area - Visible on desktop, only visible on mobile when chat is selected */}
        {(selectedChat || !isMobile) && (
          <div
            className={`${
              selectedChat ? "flex" : "hidden md:flex"
            } flex-1 flex-col pt-[20px]`}
          >
            {selectedChat && (
              <div className="md:hidden  flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedChat(null)}
                  className="mr-2"
                >
                  <ArrowRightIcon />
                </Button>
                <h2 className="font-semibold">
                  {chats.find((chat) => chat.id === selectedChat)?.name}
                </h2>
              </div>
            )}

            <div className="flex-1 overflow-y-auto md:p-4">
              <div className="max-w-3xl mx-auto space-y-4">
                {messages.map((message, index) => {
                  const showAvatar =
                    !message.isUser &&
                    (index === 0 ||
                      messages[index - 1].sender !== message.sender);

                  return (
                    <div
                      key={message.id}
                      className={`flex items-start gap-2 ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!message.isUser && showAvatar ? (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.avatar} alt="Sender" />
                          <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                      ) : (
                        !message.isUser && <div className="w-8 h-8" />
                      )}
                      <div
                        className={`rounded-[12px] px-4 py-2 max-w-[80%] ${
                          message.isUser
                            ? "bg-black text-white"
                            : "bg-[#F9FAFB] text-[#000000]"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-center items-center gap-[12px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 border rounded-[30px] px-4 py-2 w-[90%]"
                >
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                  />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="shrink-0 hover:bg-transparent"
                    >
                      <ImageIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </form>
                <Button
                  type="submit"
                  size="icon"
                  className="shrink-0 bg-black text-white hover:bg-black/90 rounded-full p-2"
                >
                  <Send className="h-[20px] w-[20px]" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
