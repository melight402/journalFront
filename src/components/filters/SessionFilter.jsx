import React from "react";

const SessionFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Сессия</span>
      <select
        value={value || ""}
        onChange={(e) => onChange("session", e.target.value)}
        className="filter-select"
      >
        <option value="">Все</option>
        <option value="asia">Азия</option>
        <option value="london">Лондон</option>
        <option value="frankfurt">Франкфурт</option>
        <option value="new_york">Нью-Йорк</option>
      </select>
    </label>
  );
};

export default SessionFilter;

