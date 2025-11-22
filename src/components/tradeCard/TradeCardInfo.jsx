import React from "react";
import { getTvxLabel } from "../../constants/index.js";

const TradeCardInfo = ({ trade }) => {
  return (
    <div className="trade-info">
      {trade.tvx && (
        <div className="info-item">
          <span className="info-label">Стратегия</span>
          <span className="info-value">{getTvxLabel(trade.tvx)}</span>
        </div>
      )}
      
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
      
      {trade.profit_amount !== null && trade.profit_amount !== undefined && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#26a69a" }}>Прибыль</span>
          <span className="info-value" style={{ color: "#26a69a", fontWeight: "bold" }}>
            {parseFloat(trade.profit_amount).toFixed(2)} USDT
          </span>
        </div>
      )}
      
      {trade.loss_amount !== null && trade.loss_amount !== undefined && (
        <div className="info-item">
          <span className="info-label" style={{ color: "#ef5350" }}>Убыток</span>
          <span className="info-value" style={{ color: "#ef5350", fontWeight: "bold" }}>
            {parseFloat(trade.loss_amount).toFixed(2)} USDT
          </span>
        </div>
      )}
      
      {trade.note && (
        <div className="info-item">
          <span className="info-label">Заметка</span>
          <span className="info-value">{trade.note}</span>
        </div>
      )}
    </div>
  );
};

export default TradeCardInfo;

