import React, { useState } from "react";
import ScreenshotModal from "./ScreenshotModal.jsx";
import TradeCardHeader from "./TradeCardHeader.jsx";
import TradeCardInfo from "./TradeCardInfo.jsx";
import TradeCardScreenshots from "./TradeCardScreenshots.jsx";
import TradeCardDates from "./TradeCardDates.jsx";
import { useTradeDelete } from "../../hooks/useTradeDelete";
import { useScreenshotModal } from "../../hooks/useScreenshotModal";
import { updatePositionProfitLoss } from "../../utils/api.js";

const TradeCard = ({ trade, onDelete, onProfitLossUpdated }) => {
  const { handleDelete, isDeleting } = useTradeDelete(onDelete);
  const { modalImage, openModal, closeModal } = useScreenshotModal();
  const [isUpdatingProfitLoss, setIsUpdatingProfitLoss] = useState(false);

  const handleProfitLossChange = async (currentTrade, next) => {
    setIsUpdatingProfitLoss(true);
    try {
      const result = await updatePositionProfitLoss(currentTrade.id, next);
      if (onProfitLossUpdated) {
        onProfitLossUpdated(currentTrade.id, result.updated);
      }
    } catch (error) {
      alert(`Ошибка при изменении результата: ${error.message}`);
    } finally {
      setIsUpdatingProfitLoss(false);
    }
  };

  return (
    <>
      <div className="trade-card">
        <TradeCardHeader 
          trade={trade} 
          onDelete={handleDelete} 
          isDeleting={isDeleting}
          onProfitLossChange={handleProfitLossChange}
          isUpdatingProfitLoss={isUpdatingProfitLoss}
        />
        <TradeCardInfo trade={trade} />
        <TradeCardScreenshots 
          trade={trade} 
          onScreenshotClick={openModal} 
        />
        <TradeCardDates trade={trade} />
      </div>
      
      {modalImage && (
        <ScreenshotModal imageUrl={modalImage} onClose={closeModal} />
      )}
    </>
  );
};

export default TradeCard;
