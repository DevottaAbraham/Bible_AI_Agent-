import { useEffect, useRef } from "react";
import { ChatInput } from "./ChatInput";
import { useChat } from "../store/chatStore";
import { useFont } from "../store/fontStore";
import { FaBible, FaUser } from "react-icons/fa";

export const ChatWindow = () => {
  const { chats, activeChat, setActive } = useChat();
  const { size } = useFont();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = chats.find((c) => c.id === activeChat);

  // auto-select newest chat
  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActive(chats[chats.length - 1].id);
    }
  }, [chats, activeChat, setActive]);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 relative">

      {/* Header */}
      <header className="flex items-center justify-center px-16 lg:px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <h1
          style={{ fontSize: size ? `${Number(size) + 4}px` : "24px" }}
          className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 text-center"
        >
          📖 Bible AI Chatbot
        </h1>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 sm:space-y-8 scroll-smooth">
        {!chat ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-6 p-8">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-2 animate-fade-in">
              <FaBible size={40} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome to Bible AI</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md text-lg leading-relaxed">
              Ask questions about scripture, theology, and biblical history.
            </p>
          </div>
        ) : (
          chat.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-4 max-w-3xl mx-auto ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.from !== "user" && (
                <div className="w-10 h-10 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <FaBible size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
              )}

              <div
                style={{ fontSize: size || "16px" }}
                className={`px-6 py-3.5 rounded-2xl max-w-[85%] sm:max-w-[75%] leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-none"
                    : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 text-slate-700 dark:text-slate-200 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.from === "user" && (
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <FaUser size={16} className="text-indigo-700 dark:text-indigo-300" />
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};
