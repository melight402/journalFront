export const exportTradesToCsv = async (trades, resolveScreenshotUrl = (path) => path) => {
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
    'Скриншот открытия',
    'Скриншот закрытия',
  ];

  const rows = await Promise.all(trades.map(async (trade) => [
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
    await screenshotToDataUrl(trade.open_screenshot_path || trade.screenshot_url, resolveScreenshotUrl),
    await screenshotToDataUrl(trade.close_screenshot_path || trade.close_screenshot_url, resolveScreenshotUrl),
  ]));

  const csvContent = [
    headers.map(escapeCsvField).join(','),
    ...rows.map(row => row.map(escapeCsvField).join(','))
  ].join('\n');

  downloadCsv(csvContent, 'trades_export.csv');
};

export const parseTradesCsv = (csvText) => {
  const rows = parseCsvRows(csvText.replace(/^\uFEFF/, ''));
  if (rows.length < 2) {
    throw new Error('CSV не содержит сделок');
  }

  const headers = rows[0].map((header) => header.trim());
  const requiredHeaders = ['Символ', 'Направление', 'Цена входа'];
  const missingHeader = requiredHeaders.find((header) => !headers.includes(header));
  if (missingHeader) {
    throw new Error(`В CSV отсутствует колонка «${missingHeader}»`);
  }

  return rows.slice(1)
    .filter((row) => row.some((value) => value.trim() !== ''))
    .map((row, index) => {
      const trade = Object.fromEntries(headers.map((header, columnIndex) => [header, row[columnIndex] ?? '']));
      const value = (header) => trade[header] ?? '';
      return {
        rowNumber: index + 2,
        id: value('ID'),
        symbol: value('Символ'),
        direction: value('Направление'),
        entryPrice: value('Цена входа'),
        positionUsdt: value('Позиция (USDT)'),
        purchaseVolume: value('Объем покупки (USDT)'),
        commission: value('Комиссия'),
        riskUsdt: value('Риск (USDT)'),
        profitAmount: value('Прибыль (USDT)'),
        lossAmount: value('Убыток (USDT)'),
        profitLoss: value('Профит/Убыток'),
        tvx: value('Стратегия'),
        timeframe: value('Таймфрейм'),
        note: value('Заметка'),
        openDateTime: value('Дата открытия'),
        closeDateTime: value('Дата закрытия'),
        openScreenshot: value('Скриншот открытия'),
        closeScreenshot: value('Скриншот закрытия'),
      };
    });
};

const screenshotToDataUrl = async (screenshotPath, resolveScreenshotUrl) => {
  if (!screenshotPath) return '';

  const response = await fetch(resolveScreenshotUrl(screenshotPath));
  if (!response.ok) {
    throw new Error(`Не удалось скачать скриншот: ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type') || 'image/png';
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `data:${contentType};base64,${btoa(binary)}`;
};

const parseCsvRows = (csvText) => {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"') {
      if (quoted && nextCharacter === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
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
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(url);
};
