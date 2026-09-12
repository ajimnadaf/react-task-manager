import React from "react";

export default function SearchSortBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="search-sort-bar">
      <input
        type="text"
        placeholder="Search tasks or categories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Manual order</option>
        <option value="priority">Priority (High → Low)</option>
        <option value="dueDate">Due Date (Soonest)</option>
        <option value="newest">Newest First</option>
      </select>
    </div>
  );
}
