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

  // Auto-select the latest chat if we have chats but none is active
  useEffect(() => {
    if (!activeChat && chats.length > 0) {
      setActive(chats[chats.length - 1].id);
    }
  }, [chats, activeChat, setActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-white dark:bg-[#09090b] relative transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-center p-4 border-b border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <h1 
          style={{ fontSize: size ? `${Number(size) + 4}px` : '24px' }}
          className="font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2"
        >
          📖 Bible AI Agent
        </h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
        {!chat ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
            <div className="p-6 rounded-full bg-zinc-100 dark:bg-white/5 transition-colors duration-300">
              <FaBible size={48} className="text-blue-400" />
            </div>
            <p 
              style={{ fontSize: size || '18px' }}
              className="font-medium text-zinc-500 dark:text-zinc-300 transition-colors duration-300"
            >
              Select a chat or ask a question to begin
            </p>
          </div>
        ) : (
          chat.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 md:gap-4 ${
                msg.from === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                {msg.from === "user" ? <FaUser size={14} /> : <FaBible size={16} />}
              </div>

              {/* Message Bubble */}
              <div
                style={{ fontSize: size || '16px' }}
                className={`relative px-5 py-3 md:py-4 md:px-6 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-md leading-relaxed text-sm md:text-base break-words whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : "bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-white/5 text-zinc-800 dark:text-zinc-100 rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput />
    </div>
  );
};
