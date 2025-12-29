import { useState, useCallback } from "react";
import { fetchHistoryPositions, fetchStats } from "../utils/api";

export const useTradesLoader = () => {
  const [trades, setTrades] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTrades = useCallback(async (filtersToUse) => {
    setLoading(true);
    setError(null);
    
    try {
      const [tradesData, statsData] = await Promise.all([
        fetchHistoryPositions(filtersToUse),
        fetchStats({
          symbol: filtersToUse.symbol || null,
          direction: filtersToUse.direction || null,
          tvx: filtersToUse.tvx || null,
          session: filtersToUse.session || null,
          sourceType: filtersToUse.sourceType || null,
          status: filtersToUse.status || null,
          timeframe: filtersToUse.timeframe || null,
          startDate: filtersToUse.startDate || null,
          endDate: filtersToUse.endDate || null
        }),
      ]);
      
      let fetched = tradesData.trades || [];
      if (filtersToUse && filtersToUse.timeframe) {
        fetched = fetched.filter(t => {
          if (!t.timeframe) return false;
          return String(t.timeframe) === String(filtersToUse.timeframe);
        });
      }
      setTrades(fetched);
      setStats(statsData);
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch') || err.message.includes('ERR_CONNECTION_REFUSED')
        ? 'Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен на http://localhost:3001'
        : err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStats = useCallback(async (filtersToUse) => {
    try {
      const statsData = await fetchStats({
        symbol: filtersToUse.symbol || null,
        direction: filtersToUse.direction || null,
        tvx: filtersToUse.tvx || null,
        session: filtersToUse.session || null,
        sourceType: filtersToUse.sourceType || null,
        status: filtersToUse.status || null,
        timeframe: filtersToUse.timeframe || null,
        startDate: filtersToUse.startDate || null,
        endDate: filtersToUse.endDate || null
      });
      setStats(statsData);
    } catch {
      void 0;
    }
  }, []);

  return { trades, stats, loading, error, loadTrades, updateStats, setTrades };
};

