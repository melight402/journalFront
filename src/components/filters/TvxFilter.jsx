import React, { useEffect, useRef, useState } from "react";

const TvxFilter = ({ value, strategies, onChange, onAdd, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [form, setForm] = useState({ value: "", label: "", description: "" });
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedStrategy = strategies.find((strategy) => strategy.value === value);

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onAdd(form);
      setForm({ value: "", label: "", description: "" });
      setIsCreateOpen(false);
      setIsOpen(false);
    } catch (createError) {
      setError(createError.message);
    }
  };

  return (
    <div className="filter-item strategy-filter" ref={containerRef}>
      <span className="filter-label">Стратегия</span>
      <button
        type="button"
        className="filter-select strategy-filter-button"
        onClick={() => setIsOpen((open) => !open)}
        title={selectedStrategy?.description || "Выберите стратегию"}
      >
        <span>{selectedStrategy?.label || "Все"}</span>
        <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="strategy-dropdown">
          <button
            type="button"
            className={`strategy-option ${!value ? "selected" : ""}`}
            onClick={() => { onChange("tvx", ""); setIsOpen(false); }}
          >
            Все
          </button>
          {strategies.map((strategy) => (
            <div
              className={`strategy-option-row ${strategy.value === value ? "selected" : ""}`}
              key={strategy.value}
              title={strategy.description}
            >
              <button
                type="button"
                className="strategy-option"
                onClick={() => { onChange("tvx", strategy.value); setIsOpen(false); }}
              >
                {strategy.label}
              </button>
              <button
                type="button"
                className="strategy-remove-button"
                title={`Удалить стратегию «${strategy.label}»`}
                onClick={() => onDelete(strategy.value)}
              >
                ×
              </button>
            </div>
          ))}
          <button type="button" className="strategy-add-option" onClick={() => setIsCreateOpen(true)}>
            + Добавить стратегию
          </button>
        </div>
      )}
      {isCreateOpen && (
        <div className="modal" onClick={() => setIsCreateOpen(false)}>
          <form className="strategy-modal-content" onSubmit={handleCreate} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setIsCreateOpen(false)} aria-label="Закрыть">×</button>
            <h2>Новая стратегия</h2>
            <label>Идентификатор<input required value={form.value} onChange={(event) => setForm({ ...form, value: event.target.value })} /></label>
            <label>Название<input required value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} /></label>
            <label>Описание<textarea required rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
            {error && <div className="strategy-error">{error}</div>}
            <button className="filter-button" type="submit">Создать</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TvxFilter;

