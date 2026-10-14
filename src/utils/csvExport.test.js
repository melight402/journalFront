import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTradesCsv } from './csvExport.js';

test('parseTradesCsv preserves commas and quotes in notes', () => {
  const csv = [
    'ID,Символ,Направление,Цена входа,Позиция (USDT),Заметка',
    '12,BTCUSDT,Long,100,250,"Вход, ""по плану"""'
  ].join('\n');

  assert.deepEqual(parseTradesCsv(csv), [{
    rowNumber: 2,
    id: '12',
    symbol: 'BTCUSDT',
    direction: 'Long',
    entryPrice: '100',
    positionUsdt: '250',
    purchaseVolume: '',
    commission: '',
    riskUsdt: '',
    profitAmount: '',
    lossAmount: '',
    profitLoss: '',
    tvx: '',
    timeframe: '',
    note: 'Вход, "по плану"',
    openDateTime: '',
    closeDateTime: '',
    openScreenshot: '',
    closeScreenshot: ''
  }]);
});