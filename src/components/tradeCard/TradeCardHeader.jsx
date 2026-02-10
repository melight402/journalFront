import React from "react";

const TradeCardHeader = ({ trade, onDelete, isDeleting }) => {
  const isProfit = trade.profit_loss === "profit";
  const profitLossLabel = isProfit ? "Прибыль" : "Убыток";

  return (
    <div className="trade-header">
      <span className="trade-symbol">{trade.symbol}</span>
      <span className={`trade-direction direction-${trade.direction.toLowerCase()}`}>
        {trade.direction}
      </span>
      {trade.profit_loss && (
        <span 
          className="trade-profit-loss"
          style={{ 
            color: isProfit ? "#26a69a" : "#ef5350",
            fontWeight: "bold"
          }}
        >
          {profitLossLabel}
        </span>
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

