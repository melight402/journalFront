import { useState } from "react";
import { deleteTrade } from "../utils/api";

export const useTradeDelete = (onDelete) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (tradeId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту сделку? Это действие нельзя отменить.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTrade(tradeId);
      if (onDelete) {
        onDelete(tradeId);
      }
    } catch (error) {
      alert(`Ошибка при удалении сделки: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
};

