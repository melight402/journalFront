import React from "react";

const DateRangeFilter = ({ startDate, endDate, onChange }) => {
  return (
    <>
      <label className="filter-item">
        <span className="filter-label">Дата от</span>
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="filter-input"
        />
      </label>
      
      <label className="filter-item">
        <span className="filter-label">Дата до</span>
        <input
          type="date"
          value={endDate || ""}
          onChange={(e) => onChange("endDate", e.target.value)}
          className="filter-input"
        />
      </label>
    </>
  );
};

export default DateRangeFilter;

