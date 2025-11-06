import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Read from localStorage immediately (no render delay)
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme instantly without React delay
  const applyThemeInstantly = (newTheme) => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    applyThemeInstantly(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyThemeInstantly(newTheme); // apply immediately
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MdDarkMode className="text-slate-700" />
      ) : (
        <MdLightMode className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
