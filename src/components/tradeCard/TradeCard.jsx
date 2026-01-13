import React, { useState, useEffect } from "react";
import ScreenshotModal from "./ScreenshotModal.jsx";
import TradeCardHeader from "./TradeCardHeader.jsx";
import TradeCardInfo from "./TradeCardInfo.jsx";
import TradeCardScreenshots from "./TradeCardScreenshots.jsx";
import TradeCardDates from "./TradeCardDates.jsx";
import { useTradeDelete } from "../../hooks/useTradeDelete";
import { useScreenshotModal } from "../../hooks/useScreenshotModal";

import { updatePositionFields } from "../../utils/api.js";

const TradeCard = ({ trade, onDelete }) => {
  const { handleDelete, isDeleting } = useTradeDelete(onDelete);
  const [localTrade, setLocalTrade] = useState(trade);

  useEffect(() => {
    setLocalTrade(trade);
  }, [trade]);

  const handleUpdate = async (fields) => {
    try {
      await updatePositionFields(localTrade.id, fields);
      setLocalTrade((t) => ({ ...t, ...fields }));
    } catch {
      // swallow error; parent UI remains unchanged
    }
  };
  const { modalImage, openModal, closeModal } = useScreenshotModal();

  return (
    <>
      <div className="trade-card">
        <TradeCardHeader 
          trade={localTrade} 
          onDelete={handleDelete} 
          isDeleting={isDeleting}
          onUpdate={handleUpdate}
        />
        <TradeCardInfo trade={localTrade} onUpdate={handleUpdate} />
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
