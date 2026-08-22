import React from "react";

const TradeCardHeader = ({ trade, onDelete, isDeleting, onToggleProfitLoss, isUpdatingProfitLoss }) => {
  const isProfit = trade.profit_loss === "profit";
  const profitLossLabel = isProfit ? "Прибыль" : "Убыток";
  const nextLabel = isProfit ? "убыток" : "прибыль";

  return (
    <div className="trade-header">
      <span className="trade-symbol">{trade.symbol}</span>
      <span className={`trade-direction direction-${trade.direction.toLowerCase()}`}>
        {trade.direction}
      </span>
      {trade.profit_loss && (
        <button
          type="button"
          className="trade-profit-loss trade-profit-loss-toggle"
          onClick={(e) => {
            e.stopPropagation();
            onToggleProfitLoss(trade);
          }}
          disabled={isUpdatingProfitLoss || isDeleting}
          style={{ 
            color: isProfit ? "#26a69a" : "#ef5350",
            fontWeight: "bold"
          }}
          title={`Нажмите, чтобы сменить на ${nextLabel}`}
        >
          {isUpdatingProfitLoss ? "..." : profitLossLabel}
        </button>
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

