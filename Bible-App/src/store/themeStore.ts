import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useTheme = create<ThemeStore>((set) => {
  // 1. Helper to determine initial theme
  const getInitialTheme = (): "light" | "dark" => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    
    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const initialTheme = getInitialTheme();

  // 2. Apply theme to DOM immediately
  if (initialTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === "light" ? "dark" : "light";
        
        // 3. Update DOM and localStorage
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", newTheme);
        
        return { theme: newTheme };
      }),
  };
});
