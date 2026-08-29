export const serializeTradeFilters = (filters = {}) => {
  const params = new URLSearchParams();

  const appendIfPresent = (key, value) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return;
      params.append(key, value.join(','));
      return;
    }

    params.append(key, String(value));
  };

  const include = [
    ['symbol', filters.symbol],
    ['direction', filters.direction],
    ['tvx', filters.tvx],
    ['session', filters.session],
    ['sourceType', filters.sourceType],
    ['status', filters.status === 'all' ? undefined : filters.status],
    ['profitLoss', filters.profitLoss === 'all' ? undefined : filters.profitLoss],
    ['timeframe', filters.timeframe],
    ['startDate', filters.startDate],
    ['endDate', filters.endDate],
    ['weekdays', filters.weekdays],
    ['limit', filters.limit],
    ['offset', filters.offset],
  ];

  include.forEach(([key, value]) => appendIfPresent(key, value));

  return params;
};
