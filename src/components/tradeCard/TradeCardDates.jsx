import React from "react";
import { formatTradeDate } from "../../utils/dateFormatters";

const TradeCardDates = ({ trade }) => {
  const openDate = formatTradeDate(trade.open_date_time || trade.created_at);
  const closeDate = formatTradeDate(trade.close_date_time);

  if (!openDate && !closeDate) {
    return null;
  }

  return (
    <div className="trade-dates">
      {openDate && <div className="trade-date">Открыта: {openDate}</div>}
      {closeDate && <div className="trade-date">Закрыта: {closeDate}</div>}
    </div>
  );
};

export default TradeCardDates;

