import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeTradeFilters } from './filterQuery.js';

test('serializeTradeFilters includes profitLoss filter value', () => {
  const params = serializeTradeFilters({
    symbol: 'BTCUSDT',
    sourceType: 'history',
    status: 'closed',
    profitLoss: 'profit'
  });

  assert.equal(params.get('symbol'), 'BTCUSDT');
  assert.equal(params.get('sourceType'), 'history');
  assert.equal(params.get('status'), 'closed');
  assert.equal(params.get('profitLoss'), 'profit');
});
