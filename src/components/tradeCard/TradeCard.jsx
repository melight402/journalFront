import React from "react";
import ScreenshotModal from "./ScreenshotModal.jsx";
import TradeCardHeader from "./TradeCardHeader.jsx";
import TradeCardInfo from "./TradeCardInfo.jsx";
import TradeCardScreenshots from "./TradeCardScreenshots.jsx";
import TradeCardDates from "./TradeCardDates.jsx";
import { useTradeDelete } from "../../hooks/useTradeDelete";
import { useScreenshotModal } from "../../hooks/useScreenshotModal";

const TradeCard = ({ trade, onDelete }) => {
  const { handleDelete, isDeleting } = useTradeDelete(onDelete);
  const { modalImage, openModal, closeModal } = useScreenshotModal();

  return (
    <>
      <div className="trade-card">
        <TradeCardHeader 
          trade={trade} 
          onDelete={handleDelete} 
          isDeleting={isDeleting} 
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
