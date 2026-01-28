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
     <aside className={`fixed inset-y-0 left-0 z-40 h-full w-72 bg-white dark:bg-[#111827]/90 backdrop-blur-xl border-r border-zinc-200 dark:border-white/10 p-6 flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>

           <div className="flex justify-between items-center mb-6">
             <h1 
               style={{ fontSize: size ? `${Number(size) + 4}px` : '24px' }}
               className="font-bold flex items-center gap-2 text-zinc-800 dark:text-white"
             >
               📖 BIBLE AI
             </h1>
             <button className="lg:hidden text-zinc-500 hover:text-zinc-800 dark:text-white/60 dark:hover:text-white" onClick={() => setOpen(false)}>
               <FaTimes size={20} />
             </button>
           </div>

            <button 
              style={{ fontSize: size || '16px' }}
              className="w-full mb-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition font-medium text-white" 
              onClick={newChat}
            >
              + New Chat
            </button>
              <div className="space-y-2 overflow-y-auto flex-1">
               {chats.map(chat=>(

                    <div
            key={chat.id}
            onClick={() => setActive(chat.id)}
            className={`
              p-3 rounded-xl cursor-pointer
              flex justify-between items-center
              transition
              ${
                activeChat === chat.id
                  ? "bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30"
                  : "hover:bg-zinc-100 dark:hover:bg-white/5"
              }
            `}
          >
            <span style={{ fontSize: size || '16px' }} className="truncate text-zinc-700 dark:text-zinc-200">{chat.title}</span>

            <div className="flex gap-2 opacity-60 hover:opacity-100">
              <FaEdit
                onClick={() =>
                  renameChat(chat.id, prompt("Rename") || chat.title)
                }
              />
              <FaTrash
                onClick={() => deleteChat(chat.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <Settings />
    </aside>
  );
}
