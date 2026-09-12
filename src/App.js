import React, { useState, useMemo } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import StatsDashboard from "./components/StatsDashboard";
import SearchSortBar from "./components/SearchSortBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import "./styles.css";

function Dashboard() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { theme } = useTheme();

  const handleAddTask = (task) => setTasks((prev) => [task, ...prev]);

  const handleToggle = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const handleEdit = (id, updates) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );

  const handleReorder = (fromIndex, toIndex) => {
    setTasks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  };

  const canReorder =
    filter === "all" && search.trim() === "" && sortBy === "default";
  const priorityWeight = { high: 3, medium: 2, low: 1 };

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (t) =>
          t.text.toLowerCase().includes(q) ||
          (t.category && t.category.toLowerCase().includes(q))
      );
    }

    if (sortBy === "priority") {
      result = [...result].sort(
        (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
      );
    } else if (sortBy === "dueDate") {
      result = [...result].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    } else if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return result;
  }, [tasks, filter, search, sortBy]);

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <Header taskCount={tasks.length} />
        <StatsDashboard tasks={tasks} />
        <TaskForm onAddTask={handleAddTask} />
        <SearchSortBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        {!canReorder && tasks.length > 0 && (
          <p className="reorder-hint">
            Clear filters, search, and sorting to drag-and-drop reorder tasks.
          </p>
        )}
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onReorder={handleReorder}
          canReorder={canReorder}
        />
        <Footer
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
