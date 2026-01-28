import { useState, type KeyboardEvent } from "react";
import { useChat } from "../store/chatStore";
import { FaPaperPlane } from "react-icons/fa";
import { useFont } from "../store/fontStore";

export const ChatInput=()=> {
  const [text, setText] = useState("");
  const { sendMessage, activeChat, newChat } = useChat();
  const { size } = useFont();

  const handleSend = () => {
    if (!text.trim()) return;
    
    // Automatically create a new chat if none is active
    if (!activeChat) {
      newChat();
    }
    
    sendMessage(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-sm pb-6 md:pb-8 transition-colors duration-300 relative z-20">
      <div className="max-w-3xl mx-auto flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-2xl p-2 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ fontSize: size || '16px' }}
          placeholder="Ask a question about the Bible..."
          className="flex-1 bg-transparent text-zinc-900 dark:text-white placeholder-zinc-500 px-4 py-2 outline-none min-w-0"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${
            text.trim()
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 active:scale-95"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}
