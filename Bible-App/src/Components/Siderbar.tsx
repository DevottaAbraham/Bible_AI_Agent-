import { FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { useChat } from "../store/chatStore";
import { Settings } from "./Settings";
import { useFont } from "../store/fontStore";

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

            <button 
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

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-2 bg-gradient-to-l from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 pl-2">
              <button 
                className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                onClick={(e) => { e.stopPropagation(); renameChat(chat.id, prompt("Rename") || chat.title); }}
              >
                <FaEdit size={12} />
              </button>
              <button 
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md text-slate-400 hover:text-red-600 transition-colors"
                onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
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
    </aside>
  );
}
