import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ taskCount }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div>
        <h1>Task Manager</h1>
        <p className="subtitle">
          {taskCount} task{taskCount !== 1 ? "s" : ""} total
        </p>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </header>
  );
}
