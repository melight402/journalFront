import React from "react";

const DirectionFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Направление</span>
      <select
        value={value}
        onChange={(e) => onChange("direction", e.target.value)}
        className="filter-select"
      >
        <option value="">Все</option>
        <option value="Long">Long</option>
        <option value="Short">Short</option>
      </select>
    </label>
  );
};

export default DirectionFilter;

