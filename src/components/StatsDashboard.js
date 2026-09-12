import React, { useMemo } from "react";

export default function StatsDashboard({ tasks }) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    const byPriority = { low: 0, medium: 0, high: 0 };
    const byCategory = {};

    tasks.forEach((t) => {
      byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
      const cat = t.category || "Uncategorized";
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });

    return { total, completed, active, percent, byPriority, byCategory };
  }, [tasks]);

  if (stats.total === 0) return null;

  return (
    <div className="stats-dashboard">
      <div className="progress-row">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
        <span className="progress-label">{stats.percent}% complete</span>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-number">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{stats.completed}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <div className="breakdown">
        <div className="breakdown-group">
          <span className="breakdown-title">Priority</span>
          {Object.entries(stats.byPriority).map(([key, val]) =>
            val > 0 ? (
              <span key={key} className={`badge priority-${key}`}>
                {key}: {val}
              </span>
            ) : null
          )}
        </div>
        <div className="breakdown-group">
          <span className="breakdown-title">Category</span>
          {Object.entries(stats.byCategory).map(([key, val]) => (
            <span key={key} className="badge category-badge">
              {key}: {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
