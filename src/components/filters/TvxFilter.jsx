import React from "react";
import { getTvxLabel } from "../../constants/index.js";

const TvxFilter = ({ value, tvxList, onChange }) => {
  return (
    <label className="filter-item">
      <span className="filter-label">Стратегия</span>
      <select
        value={value || ""}
        onChange={(e) => onChange("tvx", e.target.value)}
        className="filter-select"
      >
        <option value="">Все</option>
        {tvxList.map((tvx) => (
          <option key={tvx} value={tvx}>
            {getTvxLabel(tvx)}
          </option>
        ))}
      </select>
    </label>
  );
};

export default TvxFilter;

