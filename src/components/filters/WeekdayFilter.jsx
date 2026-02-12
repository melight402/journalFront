import React, { useState, useRef, useEffect } from "react";

const WEEKDAYS = [
  { value: 0, label: "Вс" },
  { value: 1, label: "Пн" },
  { value: 2, label: "Вт" },
  { value: 3, label: "Ср" },
  { value: 4, label: "Чт" },
  { value: 5, label: "Пт" },
  { value: 6, label: "Сб" },
];

const WeekdayFilter = ({ value = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedWeekdays = Array.isArray(value) ? value : [];

  const handleToggleWeekday = (weekday) => {
    const newWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter(w => w !== weekday)
      : [...selectedWeekdays, weekday];
    onChange("weekdays", newWeekdays);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDisplayText = () => {
    if (selectedWeekdays.length === 0) {
      return "Все дни";
    }
    if (selectedWeekdays.length === 7) {
      return "Все дни";
    }
    return `${selectedWeekdays.length} дней`;
  };

  return (
    <div className="filter-item weekday-filter-container" ref={dropdownRef}>
      <span className="filter-label">День недели</span>
      <button
        className="filter-select weekday-filter-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{getDisplayText()}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      {isOpen && (
        <div className="weekday-filter-dropdown">
          {WEEKDAYS.map((day) => (
            <label key={day.value} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={selectedWeekdays.includes(day.value)}
                onChange={() => handleToggleWeekday(day.value)}
                className="filter-checkbox"
              />
              {day.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekdayFilter;
