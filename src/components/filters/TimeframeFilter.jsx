import React from "react";

const TimeframeFilter = ({ value = "", onChange }) => {
  const handle = (e) => onChange('timeframe', e.target.value);

  return (
    <div className="filter-item">
      <label className="filter-label">Timeframe</label>
      <select className="filter-select" value={value} onChange={handle}>
        <option value="">Все</option>
        <option value="1m">1m</option>
        <option value="3m">3m</option>
        <option value="5m">5m</option>
        <option value="15m">15m</option>
        <option value="30m">30m</option>
        <option value="1h">1h</option>
        <option value="4h">4h</option>
        <option value="1d">1d</option>
      </select>
    </div>
  );
};

export default TimeframeFilter;
