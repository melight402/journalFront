import React from "react";

const TradeCardHeader = ({ trade, onDelete, isDeleting, onProfitLossChange, isUpdatingProfitLoss }) => {
  const profitLossColor = trade.profit_loss === "profit"
    ? "#26a69a"
    : trade.profit_loss === "loss" ? "#ef5350" : "#9EAAC7";

  return (
    <div className="trade-header">
      <span className="trade-symbol">{trade.symbol}</span>
      <span className={`trade-direction direction-${trade.direction.toLowerCase()}`}>
        {trade.direction}
      </span>
      {trade.profit_loss && (
        <select
          className="trade-profit-loss trade-profit-loss-toggle"
          value={trade.profit_loss}
          onChange={(e) => {
            e.stopPropagation();
            onProfitLossChange(trade, e.target.value);
          }}
          disabled={isUpdatingProfitLoss || isDeleting}
          style={{ 
            color: profitLossColor,
            fontWeight: "bold"
          }}
          title="Выберите результат сделки"
        >
          <option value="profit">Прибыль</option>
          <option value="loss">Убыток</option>
          <option value="breakeven">Безубыток</option>
        </select>
      )}
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

