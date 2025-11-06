import { useState, useEffect } from "react";
import { fetchTvxList } from "../utils/api";

export const useTvxList = () => {
  const [tvxList, setTvxList] = useState([]);

  useEffect(() => {
    const loadTvxList = async () => {
      try {
        const list = await fetchTvxList();
        setTvxList(list);
      } catch {
        void 0;
      }
    };
    loadTvxList();
  }, []);

  return { tvxList };
};

