import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      aria-label={darkMode ? "حالت روشن" : "حالت تاریک"}
      className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-violet-600 hover:text-white dark:border-slate-700 dark:bg-[#18233a] dark:text-slate-200 dark:hover:bg-violet-600"
    >
      {darkMode ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;

