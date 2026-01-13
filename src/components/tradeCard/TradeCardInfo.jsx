import React, { useState, useEffect } from "react";
import { getTvxLabel, TVX_OPTIONS } from "../../constants/index.js";
import { updatePositionTvx, updatePositionNote } from "../../utils/api.js";

const TradeCardInfo = ({ trade, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [localTvx, setLocalTvx] = useState(trade.tvx || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(false);
  const [localNote, setLocalNote] = useState(trade.note || "");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [errorNote, setErrorNote] = useState(null);
  const [localProfitLoss, setLocalProfitLoss] = useState(trade.profit_loss || "");
  const [localProfitAmount, setLocalProfitAmount] = useState(
    trade.profit_amount !== null && trade.profit_amount !== undefined ? String(trade.profit_amount) : ""
  );
  const [localLossAmount, setLocalLossAmount] = useState(
    trade.loss_amount !== null && trade.loss_amount !== undefined ? String(trade.loss_amount) : ""
  );
  const [editingProfitAmount, setEditingProfitAmount] = useState(false);
  const [editingLossAmount, setEditingLossAmount] = useState(false);
  const [isSavingAmount, setIsSavingAmount] = useState(false);

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

  const handleSaveAmount = async (field, value) => {
    setIsSavingAmount(true);
    try {
      if (onUpdate) {
        const payload = {};
        payload[field] = value === "" ? null : parseFloat(value);
        await onUpdate(payload);
        if (field === 'profit_amount') setLocalProfitAmount(value);
        if (field === 'loss_amount') setLocalLossAmount(value);
      }
    } catch {
      // ignore save error for now
    } finally {
      setIsSavingAmount(false);
      setEditingProfitAmount(false);
      setEditingLossAmount(false);
    }
  };

  useEffect(() => {
    setLocalProfitLoss(trade.profit_loss || "");
    setLocalProfitAmount(trade.profit_amount !== null && trade.profit_amount !== undefined ? String(trade.profit_amount) : "");
    setLocalLossAmount(trade.loss_amount !== null && trade.loss_amount !== undefined ? String(trade.loss_amount) : "");
  }, [trade.profit_loss, trade.profit_amount, trade.loss_amount]);

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

      {/* show other info items below */}
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
      
      {(localProfitLoss === 'profit' || (trade.profit_amount !== null && trade.profit_amount !== undefined)) && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#26a69a" }}>Прибыль</span>
          <span className="info-value" style={{ color: "#26a69a", fontWeight: "bold" }}>
            {editingProfitAmount ? (
              <input
                type="number"
                step="0.01"
                value={localProfitAmount}
                onChange={(e) => setLocalProfitAmount(e.target.value)}
                onBlur={(e) => handleSaveAmount('profit_amount', e.target.value)}
                autoFocus
                disabled={isSavingAmount}
                style={{ width: 120 }}
              />
            ) : (
              <span
                onClick={() => setEditingProfitAmount(true)}
                style={{ cursor: 'pointer' }}
                title="Кликните для редактирования"
              >
                {localProfitAmount !== "" ? parseFloat(localProfitAmount).toFixed(2) + ' USDT' : '—'}
              </span>
            )}
            {isSavingAmount && <span style={{marginLeft:8}}>Сохранение...</span>}
          </span>
        </div>
      )}

      {(localProfitLoss === 'loss' || (trade.loss_amount !== null && trade.loss_amount !== undefined)) && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#ef5350" }}>Убыток</span>
          <span className="info-value" style={{ color: "#ef5350", fontWeight: "bold" }}>
            {editingLossAmount ? (
              <input
                type="number"
                step="0.01"
                value={localLossAmount}
                onChange={(e) => setLocalLossAmount(e.target.value)}
                onBlur={(e) => handleSaveAmount('loss_amount', e.target.value)}
                autoFocus
                disabled={isSavingAmount}
                style={{ width: 120 }}
              />
            ) : (
              <span
                onClick={() => setEditingLossAmount(true)}
                style={{ cursor: 'pointer' }}
                title="Кликните для редактирования"
              >
                {localLossAmount !== "" ? parseFloat(localLossAmount).toFixed(2) + ' USDT' : '—'}
              </span>
            )}
            {isSavingAmount && <span style={{marginLeft:8}}>Сохранение...</span>}
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

