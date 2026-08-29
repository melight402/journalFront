import React from "react";

const ProfitLossFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Результат закрытия</span>
      <select
        value={value || "all"}
        onChange={(e) => onChange("profitLoss", e.target.value)}
        className="filter-select"
      >
        <option value="all">Все</option>
        <option value="profit">Прибыль</option>
        <option value="loss">Убыток</option>
        <option value="breakeven">Безубыток</option>
      </select>
    </label>
  );
};

export default ProfitLossFilter;
