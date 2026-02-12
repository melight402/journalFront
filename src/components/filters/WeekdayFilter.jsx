import React from "react";

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
  const selectedWeekdays = Array.isArray(value) ? value : [];

  const handleToggleWeekday = (weekday) => {
    const newWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter(w => w !== weekday)
      : [...selectedWeekdays, weekday];
    onChange("weekdays", newWeekdays);
  };

  return (
    <div className="filter-item">
      <span className="filter-label">День недели</span>
      <div className="filter-checkboxes">
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
    </div>
  );
};

export default WeekdayFilter;
