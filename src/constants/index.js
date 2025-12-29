export const TVX_OPTIONS = [
  { value: "abc", label: "ABC" },
  { value: "level_breakout", label: "Пробой уровня" },
  { value: "false_breakout", label: "Ложный пробой" },
  { value: "level_bounce", label: "Отбой от уровня" },
  { value: "breaker_block_retest", label: "Ретест от Брейкер блака" },
  { value: "order_block_retest", label: "Ретест от Ордер блока" },
  { value: "imbalance_retest", label: "Ретест от Имбаланса" },
  { value: "channel_exit", label: "Выход из Канала" },
  { value: "triangle_exit", label: "Выход Треугольник" },
  { value: "liquidity_gathering", label: "Сбор ликвидности" },
];

export const TVX_LABELS = TVX_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

export const getTvxLabel = (tvxValue) => {
  return TVX_LABELS[tvxValue] || tvxValue;
};

