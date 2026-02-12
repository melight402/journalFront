import React from "react";
import SymbolFilter from "./SymbolFilter.jsx";
import DirectionFilter from "./DirectionFilter.jsx";
import TvxFilter from "./TvxFilter.jsx";
import SessionFilter from "./SessionFilter.jsx";
import SourceTypeFilter from "./SourceTypeFilter.jsx";
import StatusFilter from "./StatusFilter.jsx";
import DateRangeFilter from "./DateRangeFilter.jsx";
import TimeframeFilter from "./TimeframeFilter.jsx";
import WeekdayFilter from "./WeekdayFilter.jsx";

const Filters = ({ filters, tvxList = [], onFiltersChange, onApply, onReset }) => {
  const handleChange = (field, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="filters">
      <SymbolFilter value={filters.symbol} onChange={handleChange} />
      <DirectionFilter value={filters.direction} onChange={handleChange} />
      <TvxFilter value={filters.tvx} tvxList={tvxList} onChange={handleChange} />
      <TimeframeFilter value={filters.timeframe} onChange={handleChange} />
      <SessionFilter value={filters.session} onChange={handleChange} />
      <SourceTypeFilter value={filters.sourceType} onChange={handleChange} />
      <StatusFilter value={filters.status} onChange={handleChange} />
      <WeekdayFilter value={filters.weekdays} onChange={handleChange} />
      <DateRangeFilter 
        startDate={filters.startDate} 
        endDate={filters.endDate} 
        onChange={handleChange} 
      />
      
      <button onClick={onApply} className="filter-button">
        Применить фильтры
      </button>
      
      <button onClick={onReset} className="filter-button filter-button-secondary">
        Очистить все фильтры
      </button>
    </div>
  );
};

export default Filters;
