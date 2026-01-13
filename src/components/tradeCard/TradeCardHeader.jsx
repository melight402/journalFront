import React, { useState } from "react";

const TradeCardHeader = ({ trade, onDelete, isDeleting, onUpdate }) => {
  const [localProfitLoss, setLocalProfitLoss] = useState(trade.profit_loss || "");

  const handleChange = async (e) => {
    const val = e.target.value || null;
    setLocalProfitLoss(val || "");
    if (onUpdate) {
      try {
        await onUpdate({ profit_loss: val });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="trade-header">
      <span className="trade-symbol">{trade.symbol}</span>
      <span className={`trade-direction direction-${trade.direction.toLowerCase()}`}>
        {trade.direction}
      </span>
      <select
        className="trade-profit-loss"
        value={localProfitLoss}
        onChange={handleChange}
        title="Выберите Прибыль или Убыток"
      >
        <option value="">—</option>
        <option value="profit">Прибыль</option>
        <option value="loss">Убыток</option>
      </select>
      <button
        className="trade-delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(trade.id);
        }}
        disabled={isDeleting}
        title="Удалить сделку"
      >
        {isDeleting ? "..." : "×"}
      </button>
    </div>
  );
};

export default TradeCardHeader;

