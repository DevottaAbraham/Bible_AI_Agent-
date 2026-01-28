import { useTheme } from "../store/themeStore";
import { useFont } from "../store/fontStore";
import { FaMoon, FaSun, FaFont } from "react-icons/fa";

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { increase, decrease } = useFont();

  return (
    <div className="border-t border-zinc-200 dark:border-white/10 pt-4 mt-auto">
      <div className="space-y-3">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-sm font-medium text-zinc-700 dark:text-zinc-200"
        >
          <span className="flex items-center gap-3">
            {theme === "dark" ? <FaMoon className="text-blue-400" /> : <FaSun className="text-yellow-400" />}
            <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          </span>
        </button>

        <div className="flex items-center justify-between bg-zinc-100 dark:bg-white/5 rounded-xl p-1">
          <button
            onClick={decrease}
            className="flex-1 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex justify-center items-center"
            title="Decrease font size"
          >
            <span className="text-xs font-bold">A-</span>
          </button>
          
          <div className="w-px h-4 bg-zinc-300 dark:bg-white/10"></div>

          <div className="px-4 text-zinc-400 dark:text-zinc-500">
            <FaFont size={14} />
          </div>

          <div className="w-px h-4 bg-zinc-300 dark:bg-white/10"></div>

          <button
            onClick={increase}
            className="flex-1 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex justify-center items-center"
            title="Increase font size"
          >
            <span className="text-lg font-bold">A+</span>
          </button>
        </div>
      </div>
    </div>
  );
};
