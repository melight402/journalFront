const Stats = ({ stats }) => {
  if (!stats) return null;

  const netProfitLoss = stats.net_profit_loss || 0;
  const isProfit = netProfitLoss >= 0;

  return (
    <div className="stats">
      <div className="stat-item">
        <div className="stat-value">{stats.total || 0}</div>
        <div className="stat-label">Сделок</div>
      </div>
      
      <div className="stat-item">
        <div 
          className="stat-value" 
          style={{ 
            color: isProfit ? "#26a69a" : "#ef5350",
            fontWeight: "bold"
          }}
        >
          {isProfit ? "+" : ""}{parseFloat(netProfitLoss).toFixed(2)} USDT
        </div>
        <div className="stat-label">{isProfit ? "Прибыль" : "Убыток"}</div>
      </div>
      
      <div className="stat-item">
        <div className="stat-value">
          {parseFloat(stats.total_commission || 0).toFixed(4)} USDT
        </div>
        <div className="stat-label">Комиссия</div>
      </div>
      
      <div className="stat-item">
        <div 
          className="stat-value" 
          style={{ 
            color: (stats.net_profit || 0) >= 0 ? "#26a69a" : "#ef5350",
            fontWeight: "bold"
          }}
        >
          {(stats.net_profit || 0) >= 0 ? "+" : ""}{parseFloat(stats.net_profit || 0).toFixed(2)} USDT
        </div>
        <div className="stat-label">Чистая прибыль</div>
      </div>
    </div>
  );
};

export default Stats;
