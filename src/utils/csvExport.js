export const exportTradesToCsv = (trades) => {
  if (!trades || trades.length === 0) {
    alert('Нет данных для экспорта');
    return;
  }

  const headers = [
    'ID',
    'Символ',
    'Направление',
    'Цена входа',
    'Позиция (USDT)',
    'Объем покупки (USDT)',
    'Комиссия',
    'Риск (USDT)',
    'Прибыль (USDT)',
    'Убыток (USDT)',
    'Профит/Убыток',
    'Стратегия',
    'Таймфрейм',
    'Заметка',
    'Дата открытия',
    'Дата закрытия',
  ];

  const rows = trades.map(trade => [
    trade.id || '',
    trade.symbol || '',
    trade.direction || '',
    trade.entry_price !== null && trade.entry_price !== undefined ? parseFloat(trade.entry_price).toFixed(2) : '',
    trade.position_usdt !== null && trade.position_usdt !== undefined ? parseFloat(trade.position_usdt).toFixed(2) : '',
    trade.purchase_volume ? parseFloat(trade.purchase_volume).toFixed(2) : '',
    trade.commission ? parseFloat(trade.commission).toFixed(4) : '',
    trade.risk_usdt !== null && trade.risk_usdt !== undefined ? parseFloat(trade.risk_usdt).toFixed(2) : '',
    trade.profit_amount !== null && trade.profit_amount !== undefined ? parseFloat(trade.profit_amount).toFixed(2) : '',
    trade.loss_amount !== null && trade.loss_amount !== undefined ? parseFloat(trade.loss_amount).toFixed(2) : '',
    trade.profit_loss || '',
    trade.tvx || '',
    trade.timeframe || '',
    trade.note || '',
    trade.open_date_time || trade.created_at || '',
    trade.close_date_time || '',
  ]);

  const csvContent = [
    headers.map(escapeCsvField).join(','),
    ...rows.map(row => row.map(escapeCsvField).join(','))
  ].join('\n');

  downloadCsv(csvContent, 'trades_export.csv');
};

const escapeCsvField = (field) => {
  if (field === null || field === undefined) {
    return '';
  }

  const fieldStr = String(field);

  if (fieldStr.includes(',') || fieldStr.includes('"') || fieldStr.includes('\n')) {
    return `"${fieldStr.replace(/"/g, '""')}"`;
  }

  return fieldStr;
};

const downloadCsv = (content, filename) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
