import React, { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onReorder,
  canReorder,
}) {
  const [dragIndex, setDragIndex] = useState(null);

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks here. Add one above!</p>;
  }

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    onReorder(dragIndex, dropIndex);
    setDragIndex(null);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          canReorder={canReorder}
          onDragStart={setDragIndex}
          onDragOver={() => {}}
          onDrop={handleDrop}
        />
      ))}
    </ul>
  );
}
