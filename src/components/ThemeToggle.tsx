import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  const darkMode = mode === "dark";

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem(
      "digi-game-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <button
      className={`theme-toggle is-icon-only ${darkMode ? "is-dark" : "is-light"}`}
      onClick={toggleTheme}
      aria-label={darkMode ? "فعال کردن لایت مود" : "فعال کردن دارک مود"}
      title={darkMode ? "Light Mode" : "Dark Mode"}
      type="button"
    >
      <span className="theme-toggle__glow" />

      <span className="theme-toggle__icon">
        {darkMode ? (
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2 M12 20v2 M4.93 4.93l1.42 1.42 M17.65 17.65l1.42 1.42 M2 12h2 M20 12h2 M4.93 19.07l1.42-1.42 M17.65 6.35l1.42-1.42" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
          </svg>
        )}
      </span>

      <span className="theme-toggle__status">
        <span />
      </span>
    </button>
  );
}
