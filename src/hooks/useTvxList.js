import { useState, useEffect, useCallback } from "react";
import { createStrategy, deleteStrategy, fetchStrategies } from "../utils/api";

export const useTvxList = () => {
  const [strategies, setStrategies] = useState([]);

  useEffect(() => {
    fetchStrategies().then(setStrategies).catch(() => setStrategies([]));
  }, []);

  const addStrategy = useCallback(async (strategy) => {
    const created = await createStrategy(strategy);
    setStrategies((current) => [...current, created].sort((a, b) => a.label.localeCompare(b.label)));
    return created;
  }, []);

  const removeStrategy = useCallback(async (value) => {
    await deleteStrategy(value);
    setStrategies((current) => current.filter((strategy) => strategy.value !== value));
  }, []);

  return { strategies, addStrategy, removeStrategy };
};

