import { useTheme } from "../store/themeStore";
import { useFont } from "../store/fontStore";
import { FaMoon, FaSun } from "react-icons/fa";

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { increase, decrease } = useFont();

  return (
    <div className="pt-2 mt-auto">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
        >
            {theme === "dark" ? <FaMoon className="text-indigo-400" /> : <FaSun className="text-amber-400" />}
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
        </button>

        <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
          <button
            onClick={decrease}
            className="flex-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 text-xs font-bold py-1"
            title="Decrease font size"
          >
            A-
          </button>
          <div className="w-px h-3 bg-slate-200 dark:bg-slate-800 mx-1"></div>
          <button
            onClick={increase}
            className="flex-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400 text-sm font-bold py-1"
            title="Increase font size"
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
};
