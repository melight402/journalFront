import { useEffect } from "react";
import Filters from "./components/filters/Filters.jsx";
import Stats from "./components/stats/Stats.jsx";
import TradesList from "./components/tradeCard/TradesList.jsx";
import { useFilters } from "./hooks/useFilters";
import { useTradesLoader } from "./hooks/useTradesLoader";
import { useTvxList } from "./hooks/useTvxList";
import { deleteTrade } from "./utils/api.js";
import { exportTradesToCsv } from "./utils/csvExport.js";

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

  const handleProfitLossUpdated = async (tradeId, updated) => {
    setTrades((prevTrades) =>
      prevTrades.map((trade) =>
        trade.id === tradeId
          ? {
              ...trade,
              profit_loss: updated.profit_loss,
              profit_amount: updated.profit_amount,
              loss_amount: updated.loss_amount,
            }
          : trade
      )
    );
    await updateStats(filters);
  };

  const handleDeleteVisible = async () => {
    const count = trades.length;
    if (!count) return;
    const confirmed = window.confirm(`Точно удалить ${count} записей, видимых на странице? Это действие необратимо.`);
    if (!confirmed) return;

    try {
      const ids = trades.map(t => t.id);
      for (const id of ids) {
        await deleteTrade(id);
      }
      setTrades(prev => prev.filter(t => !ids.includes(t.id)));
      await updateStats(filters);
    } catch (err) {
      alert('Ошибка при удалении: ' + (err.message || err));
    }
  };

  const handleExportTrades = () => {
    if (!trades.length) {
      alert('Нет сделок для экспорта');
      return;
    }
    exportTradesToCsv(trades);
  };

  return (
    <div className="app-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h1 className="app-title">📊 Trading Journal - Журнал сделок</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleExportTrades} style={{ cursor: 'pointer' }}>Скачать .csv</button>
          <button onClick={handleDeleteVisible} style={{ cursor: 'pointer' }}>Удалить видимые</button>
        </div>
      </div>
      
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
      
      {!loading && stats && <Stats stats={stats} trades={trades} />}
      
      {!loading && (
        <TradesList
          trades={trades}
          onDelete={handleDeleteTrade}
          onProfitLossUpdated={handleProfitLossUpdated}
        />
      )}
    </div>
  );
};

export default App;
