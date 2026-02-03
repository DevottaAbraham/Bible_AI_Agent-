import { useState, type KeyboardEvent } from "react";
import { useChat } from "../store/chatStore";
import { FaPaperPlane } from "react-icons/fa";
import { useFont } from "../store/fontStore";

export const ChatInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, activeChat, newChat } = useChat();
  const { size } = useFont();

  const handleSend = async () => {
    if (!text.trim()) return;

    // create chat automatically
    if (!activeChat) {
      newChat();
    }

    await sendMessage(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-3xl mx-auto relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ fontSize: size || "16px" }}
          placeholder="Ask a question about the Bible..."
          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 px-5 py-4 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all duration-200 ${
            text.trim()
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg active:scale-95"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          }`}
        >
          <FaPaperPlane size={14} />
        </button>
      </div>

      <p className="text-xs text-center mt-2 text-slate-400">
        AI can make mistakes. Check important information.
      </p>
    </div>
  );
};
