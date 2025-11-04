import React from "react";

const SourceTypeFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Тип ордеров</span>
      <select
        value={value || ""}
        onChange={(e) => onChange("sourceType", e.target.value)}
        className="filter-select"
      >
        <option value="">Все</option>
        <option value="history">Исторические</option>
        <option value="trading">Реальные</option>
      </select>
    </label>
  );
};

export default SourceTypeFilter;

