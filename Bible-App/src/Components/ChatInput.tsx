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
    <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-3xl mx-auto relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ fontSize: size || '16px' }}
          placeholder="Ask a question about the Bible..."
          className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 px-5 py-4 pr-14 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-transparent focus:border-indigo-500/20"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all duration-200 ${
            text.trim()
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              : "bg-transparent text-slate-400 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={14} />
        </button>
      </div>
      <div className="text-center mt-2">
        <p className="text-xs text-slate-400 dark:text-slate-600">AI can make mistakes. Check important info.</p>
      </div>
    </div>
  );
}
