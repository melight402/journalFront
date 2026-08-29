import React, { useState } from "react";
import { getTvxLabel, TVX_OPTIONS } from "../../constants/index.js";
import { updatePositionTvx, updatePositionNote } from "../../utils/api.js";

const TradeCardInfo = ({ trade }) => {
  const [editing, setEditing] = useState(false);
  const [localTvx, setLocalTvx] = useState(trade.tvx || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState(trade.note || "");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [errorNote, setErrorNote] = useState(null);
  const showResultFields = trade.profit_loss !== "breakeven";

  const resultAmount = trade.profit_amount !== null && trade.profit_amount !== undefined
    ? parseFloat(trade.profit_amount)
    : trade.loss_amount !== null && trade.loss_amount !== undefined
      ? -parseFloat(trade.loss_amount)
      : null;
  const positionAmount = trade.position_usdt !== null && trade.position_usdt !== undefined
    ? parseFloat(trade.position_usdt)
    : parseFloat(trade.purchase_volume);
  const roi = resultAmount !== null && Number.isFinite(resultAmount) && positionAmount > 0
    ? (resultAmount / positionAmount) * 100
    : null;

  const handleSave = async (newTvx) => {
    setIsSaving(true);
    setError(null);
    try {
      await updatePositionTvx(trade.id, newTvx);
      setLocalTvx(newTvx || "");
      setEditing(false);
    } catch {
      setError('Ошибка сохранения');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNote = async (newNote) => {
    setIsSavingNote(true);
    setErrorNote(null);
    try {
      await updatePositionNote(trade.id, newNote);
      setLocalNote(newNote || "");
      setEditingNote(false);
    } catch {
      setErrorNote('Ошибка сохранения');
    } finally {
      setIsSavingNote(false);
    }
  };

  return (
    <div className="trade-info">
      <div className="info-item">
        <span className="info-label">Стратегия</span>
        <span className="info-value">
          {editing ? (
            <select
              value={localTvx || ""}
              onChange={(e) => setLocalTvx(e.target.value)}
              onBlur={(e) => handleSave(e.target.value)}
              disabled={isSaving}
              autoFocus
            >
              <option value="">Без стратегии</option>
              {TVX_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <span
              onClick={() => setEditing(true)}
              style={{ cursor: 'pointer' }}
              title="Кликните для редактирования"
            >
              {getTvxLabel(localTvx) || '—'}
            </span>
          )}
          {isSaving && <span style={{marginLeft:8}}>Сохранение...</span>}
          {error && <span style={{color:'red', marginLeft:8}}>{error}</span>}
        </span>
      </div>
      {trade.timeframe && (
        <div className="info-item">
          <span className="info-label">Таймфрейм</span>
          <span className="info-value">{trade.timeframe}</span>
        </div>
      )}
      {trade.tvx === undefined && !localTvx && null}
      
      <div className="info-item">
        <span className="info-label">Цена</span>
        <span className="info-value">{parseFloat(trade.entry_price).toFixed(2)}</span>
      </div>
      
      {trade.position_usdt !== null && trade.position_usdt !== undefined ? (
        <div className="info-item">
          <span className="info-label">Позиция</span>
          <span className="info-value">{parseFloat(trade.position_usdt).toFixed(2)} USDT</span>
        </div>
      ) : trade.purchase_volume && (
        <div className="info-item">
          <span className="info-label">Купленный объем</span>
          <span className="info-value">{parseFloat(trade.purchase_volume).toFixed(2)} USDT</span>
        </div>
      )}
      
      {trade.commission && (
        <div className="info-item">
          <span className="info-label">Комиссия</span>
          <span className="info-value">{parseFloat(trade.commission).toFixed(4)} USDT</span>
        </div>
      )}
      
      {trade.risk_usdt !== null && trade.risk_usdt !== undefined && (
        <div className="info-item">
          <span className="info-label">Риск</span>
          <span className="info-value">{parseFloat(trade.risk_usdt).toFixed(2)} USDT</span>
        </div>
      )}

      {showResultFields && roi !== null && (
        <div className="info-item">
          <span className="info-label" style={{ color: roi >= 0 ? "#26a69a" : "#ef5350" }}>ROI</span>
          <span className="info-value" style={{ color: roi >= 0 ? "#26a69a" : "#ef5350", fontWeight: "bold" }}>
            {roi >= 0 ? "+" : ""}{roi.toFixed(2)}%
          </span>
        </div>
      )}
      
      {showResultFields && trade.profit_amount !== null && trade.profit_amount !== undefined && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#26a69a" }}>Прибыль</span>
          <span className="info-value" style={{ color: "#26a69a", fontWeight: "bold" }}>
            {parseFloat(trade.profit_amount).toFixed(2)} USDT
          </span>
        </div>
      )}
      
      {showResultFields && trade.loss_amount !== null && trade.loss_amount !== undefined && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#ef5350" }}>Убыток</span>
          <span className="info-value" style={{ color: "#ef5350", fontWeight: "bold" }}>
            {parseFloat(trade.loss_amount).toFixed(2)} USDT
          </span>
        </div>
      )}
      
      <div className="info-item">
        <span className="info-label">Заметка</span>
        <span className="info-value">
          {editingNote ? (
            <textarea
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              onBlur={(e) => handleSaveNote(e.target.value)}
              rows={3}
              disabled={isSavingNote}
              autoFocus
              style={{ width: '100%' }}
            />
          ) : (
            <span
              onClick={() => setEditingNote(true)}
              style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }}
              title="Кликните для редактирования"
            >
              {localNote || '—'}
            </span>
          )}
          {isSavingNote && <span style={{marginLeft:8}}>Сохранение...</span>}
          {errorNote && <span style={{color:'red', marginLeft:8}}>{errorNote}</span>}
        </span>
      </div>
    </div>
  );
};

export default TradeCardInfo;

