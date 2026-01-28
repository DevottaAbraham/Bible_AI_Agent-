import { useState } from "react";
import { Sidebar } from "./Components/Siderbar";
import {ChatWindow} from "./Components/ChatWindow";
import { useTheme } from "./store/themeStore";
import { FaBars } from "react-icons/fa";

export default function App() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="flex h-dvh dark:bg-black dark:text-white overflow-hidden">

        {/* Mobile menu */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 text-zinc-800 dark:text-white shadow-lg active:scale-95 transition-all"
          onClick={() => setOpen(!open)}
        >
          <FaBars size={20} />
        </button>

        <Sidebar open={open} setOpen={setOpen} />
        <ChatWindow />
      </div>
    </div>
  );
}
