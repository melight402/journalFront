import { useState, useEffect } from "react";
import { loadFiltersFromStorage, saveFiltersToStorage, clearFiltersFromStorage } from "../utils/localStorageUtils";
import { getDefaultDateRange } from "../utils/dateFormatters";

export const useFilters = () => {
  const defaultDates = getDefaultDateRange();
  const savedFilters = loadFiltersFromStorage();
  
  const [filters, setFilters] = useState(savedFilters || {
    symbol: "",
    direction: "",
    tvx: "",
    session: "all",
    sourceType: "history",
    status: "all",
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
  });

  useEffect(() => {
    saveFiltersToStorage(filters);
  }, [filters]);

  const resetFilters = () => {
    const resetFilters = {
      symbol: "",
      direction: "",
      tvx: "",
      session: "",
      sourceType: "",
      status: "all",
      startDate: "",
      endDate: "",
    };
    setFilters(resetFilters);
    clearFiltersFromStorage();
    return resetFilters;
  };

  return { filters, setFilters, resetFilters };
};

