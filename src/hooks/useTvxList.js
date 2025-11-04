import { useState, useEffect } from "react";
import { fetchTvxList } from "../utils/api";

export const useTvxList = () => {
  const [tvxList, setTvxList] = useState([]);

  useEffect(() => {
    const loadTvxList = async () => {
      try {
        const list = await fetchTvxList();
        setTvxList(list);
      } catch (err) {
        console.error("Ошибка при загрузке списка стратегий:", err);
      }
    };
    loadTvxList();
  }, []);

  return { tvxList };
};

