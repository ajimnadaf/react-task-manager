import React, { useState } from "react";

export default function TaskItem({
  task,
  index,
  onToggle,
  onDelete,
  onEdit,
  canReorder,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category || "");
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date(new Date().toDateString());

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(task.id, {
      text: trimmed,
      priority: editPriority,
      category: editCategory.trim(),
      dueDate: editDueDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setEditPriority(task.priority);
    setEditCategory(task.category || "");
    setEditDueDate(task.dueDate || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
        />
        <input
          type="text"
          placeholder="Category"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
          className="edit-input small"
        />
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="edit-input small"
        />
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
      </li>
    );
  }

  return (
    <li
      className={`task-item priority-${task.priority} ${
        task.completed ? "completed" : ""
      } ${isOverdue ? "overdue" : ""}`}
      draggable={canReorder}
      onDragStart={() => canReorder && onDragStart(index)}
      onDragOver={(e) => {
        if (canReorder) {
          e.preventDefault();
          onDragOver(index);
        }
      }}
      onDrop={() => canReorder && onDrop(index)}
    >
      <span className="row-number">{String(index + 1).padStart(2, "0")}</span>
      {canReorder && <span className="drag-handle">⠿</span>}
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <div className="badges">
        {task.category && (
          <span className="badge category-badge">{task.category}</span>
        )}
        {task.dueDate && (
          <span
            className={`badge due-date-badge ${
              isOverdue ? "overdue-badge" : ""
            }`}
          >
            {isOverdue ? "⚠ " : "📅 "}
            {task.dueDate}
          </span>
        )}
        <span className="badge">{task.priority}</span>
      </div>
      <button className="edit-btn" onClick={() => setIsEditing(true)}>
        ✎
      </button>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </li>
  );
}
