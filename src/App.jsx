import { useEffect } from "react";
import Filters from "./components/filters/Filters.jsx";
import Stats from "./components/stats/Stats.jsx";
import TradesList from "./components/tradeCard/TradesList.jsx";
import { useFilters } from "./hooks/useFilters";
import { useTradesLoader } from "./hooks/useTradesLoader";
import { useTvxList } from "./hooks/useTvxList";

const App = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  const { trades, stats, loading, error, loadTrades, updateStats, setTrades } = useTradesLoader();
  const { tvxList } = useTvxList();

  useEffect(() => {
    loadTrades(filters);
  }, [filters, loadTrades]);

  const handleApplyFilters = () => {
    loadTrades(filters);
  };

  const handleResetFilters = async () => {
    const resetFiltersData = resetFilters();
    await loadTrades(resetFiltersData);
  };

  const handleDeleteTrade = async (deletedId) => {
    setTrades(prevTrades => prevTrades.filter(trade => trade.id !== deletedId));
    await updateStats(filters);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📊 Trading Journal - Журнал сделок</h1>
      
      <Filters
        filters={filters}
        tvxList={tvxList}
        onFiltersChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
      
      {error && (
        <div className="error-message">
          Ошибка загрузки данных: {error}
        </div>
      )}
      
      {loading && <div className="loading">Загрузка...</div>}
      
      {!loading && stats && <Stats stats={stats} />}
      
      {!loading && <TradesList trades={trades} onDelete={handleDeleteTrade} />}
    </div>
  );
};

export default App;
