import React from "react";

export default function Footer({ filter, setFilter, activeCount }) {
  const filters = ["all", "active", "completed"];

  return (
    <footer className="footer">
      <span>{activeCount} remaining</span>
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </footer>
  );
}
