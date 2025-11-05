import React from "react";
import { getScreenshotUrl } from "../../utils/api.js";

const TradeCardScreenshots = ({ trade, onScreenshotClick }) => {
  const openScreenshotUrl = trade.open_screenshot_path 
    ? getScreenshotUrl(trade.open_screenshot_path)
    : (trade.screenshot_url ? getScreenshotUrl(trade.screenshot_url) : null);
  
  const closeScreenshotUrl = trade.close_screenshot_path 
    ? getScreenshotUrl(trade.close_screenshot_path)
    : (trade.close_screenshot_url ? getScreenshotUrl(trade.close_screenshot_url) : null);

  console.log('Trade screenshots data:', {
    id: trade.id,
    symbol: trade.symbol,
    open_screenshot_path: trade.open_screenshot_path,
    close_screenshot_path: trade.close_screenshot_path,
    screenshot_url: trade.screenshot_url,
    close_screenshot_url: trade.close_screenshot_url,
    openScreenshotUrl,
    closeScreenshotUrl,
    hasCloseScreenshot: !!closeScreenshotUrl
  });

  if (!openScreenshotUrl && !closeScreenshotUrl) {
    return null;
  }

  return (
    <div className="trade-screenshots">
      {openScreenshotUrl && (
        <div className="trade-screenshot">
          <div className="screenshot-label">Открытие:</div>
          <img
            src={openScreenshotUrl}
            alt="Screenshot открытия"
            className="screenshot-img"
            onClick={() => onScreenshotClick(openScreenshotUrl)}
          />
        </div>
      )}
      
      {closeScreenshotUrl && (
        <div className="trade-screenshot">
          <div className="screenshot-label">Закрытие:</div>
          <img
            src={closeScreenshotUrl}
            alt="Screenshot закрытия"
            className="screenshot-img"
            onClick={() => onScreenshotClick(closeScreenshotUrl)}
          />
        </div>
      )}
    </div>
  );
};

export default TradeCardScreenshots;

