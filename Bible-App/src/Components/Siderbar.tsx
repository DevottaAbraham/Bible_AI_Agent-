import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { useState, useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useChat } from "../store/chatStore";
import { Settings } from "./Settings";
import { useFont } from "../store/fontStore";
import { useTheme } from "../store/themeStore";

export const Sidebar=({ open, setOpen }: any)=> {
  const {
    chats,
    newChat,
    setActive,
    deleteChat,
    renameChat,
    activeChat,
  } = useChat();
  const { size } = useFont();
  const { theme } = useTheme();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleRename = (e: MouseEvent, id: string, currentTitle: string) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Rename clicked for:", id);
    setRenameId(id);
    setRenameValue(currentTitle || "");
  };

  const handleDelete = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Delete clicked for:", id);
    setDeleteId(id);
  };

  const confirmRename = () => {
    if (renameId && renameValue.trim()) {
      if (renameChat) {
        renameChat(renameId, renameValue.trim());
      } else {
        console.error("renameChat function is missing from useChat store");
      }
      setRenameId(null);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      if (deleteChat) {
        deleteChat(deleteId);
      } else {
        console.error("deleteChat function is missing from useChat store");
      }
      setDeleteId(null);
    }
  };

  return (
     <aside className={`fixed inset-y-0 left-0 z-40 h-full w-80 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) lg:static lg:translate-x-0 ${open ? 'translate-x-0 shadow-2xl lg:shadow-none' : '-translate-x-full'}`}>

           <div className="p-6 pb-4">
             <div className="flex justify-between items-center mb-8">
             <h1 
               style={{ fontSize: size ? `${Number(size) + 4}px` : '24px' }}
               className="font-bold tracking-tight flex items-center gap-3 text-slate-900 dark:text-white"
             >
               <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold">AI</span>
               Bible Assistant
             </h1>
             <button className="lg:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors" onClick={() => setOpen(false)}>
               <FaTimes size={20} />
             </button>
           </div>

        <button type="button"
              style={{ fontSize: size || '16px' }}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-md shadow-indigo-500/20 transition-all duration-200 font-medium flex items-center justify-center gap-2 group" 
              onClick={newChat}
            >
              + New Chat
            </button>
           </div>

              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
               <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Recent Chats</div>
               {chats.map(chat=>(

                    <div
            key={chat.id}
            onClick={() => setActive(chat.id)}
            className={`
              group relative px-3 py-3 rounded-lg cursor-pointer
              flex justify-between items-center
              transition-all duration-200
              ${
                activeChat === chat.id
                  ? "bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-900/50 text-slate-600 dark:text-slate-400"
              }
            `}
          >
            <span style={{ fontSize: size || '16px' }} className={`truncate text-sm font-medium ${activeChat === chat.id ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300"}`}>{chat.title}</span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-2 bg-gradient-to-l from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 pl-2 z-10">
          <button type="button"
                className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                onClick={(e) => handleRename(e, chat.id, chat.title)}
              >
                <FaEdit size={12} />
              </button>
          <button type="button"
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md text-slate-400 hover:text-red-600 transition-colors"
                onClick={(e) => handleDelete(e, chat.id)}
              >
                <FaTrash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <Settings />
      </div>

      {isClient && (deleteId || renameId) && createPortal(
        <div className={theme === "dark" ? "dark" : ""}>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => { setDeleteId(null); setRenameId(null); }}>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-sm p-6 border border-slate-200 dark:border-slate-800" onClick={e => e.stopPropagation()}>
            {deleteId ? (
              <>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Delete Chat?</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">This action cannot be undone.</p>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                  <button type="button" onClick={confirmDelete} className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">Delete</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Rename Chat</h3>
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && confirmRename()}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 mb-6 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setRenameId(null)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                  <button type="button" onClick={confirmRename} className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">Save</button>
                </div>
              </>
            )}
          </div>
        </div>
        </div>,
        document.body
      )}
    </aside>
  );
}
