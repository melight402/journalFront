import React from "react";

const SymbolFilter = ({ value, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Символ</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange("symbol", e.target.value)}
        placeholder="BTCUSDT"
        className="filter-input"
      />
    </label>
  );
};

export default SymbolFilter;

