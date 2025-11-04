import TradeCard from "./TradeCard.jsx";

const TradesList = ({ trades, onDelete }) => {
  if (trades.length === 0) {
    return (
      <div className="loading">
        Нет сделок, соответствующих фильтрам
      </div>
    );
  }

  return (
    <div className="trades-container">
      {trades.map((trade) => (
        <TradeCard key={trade.id} trade={trade} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TradesList;

