import React from "react";

const StatusFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Статус позиции</span>
      <select
        value={value || "all"}
        onChange={(e) => onChange("status", e.target.value)}
        className="filter-select"
      >
        <option value="all">Все</option>
        <option value="open">Открытые</option>
        <option value="closed">Закрытые</option>
      </select>
    </label>
  );
};

export default StatusFilter;

