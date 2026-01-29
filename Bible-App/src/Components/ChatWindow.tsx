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
    <div className="flex-1 flex flex-col h-full w-full bg-white dark:bg-slate-950 relative font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-10">
        <h1 
          style={{ fontSize: size ? `${Number(size) + 4}px` : '24px' }}
          className="font-semibold text-slate-800 dark:text-slate-100 text-lg flex items-center gap-2"
        >
          📖 Bible AI Agent
        </h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
        {!chat ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <FaBible size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome to Bible AI</h2>
            <p 
              style={{ fontSize: size || '18px' }}
              className="text-slate-500 dark:text-slate-400"
            >
              Ask any question about scripture, theology, or history.
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
              {/* Avatar */}
              {msg.from !== 'user' && (
              <div
                className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1"
              >
                <FaBible size={14} />
              </div>
              )}

              {/* Message Bubble */}
              <div
                style={{ fontSize: size || '16px' }}
                className={`px-6 py-3.5 rounded-2xl text-base leading-relaxed shadow-sm max-w-[85%] break-words whitespace-pre-wrap ${
                  msg.from === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-bl-sm border border-slate-200/50 dark:border-slate-800"
                }`}
              >
                {msg.text}
              </div>
              {msg.from === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 flex-shrink-0 mt-1">
                  <FaUser size={14} />
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
