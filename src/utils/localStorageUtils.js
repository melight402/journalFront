const FILTERS_STORAGE_KEY = 'journal_filters';

export const loadFiltersFromStorage = () => {
  try {
    const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
  }
  return null;
};

export const saveFiltersToStorage = (filters) => {
  try {
    localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filters));
  } catch {
  }
};

export const clearFiltersFromStorage = () => {
  try {
    localStorage.removeItem(FILTERS_STORAGE_KEY);
  } catch {
  }
};

