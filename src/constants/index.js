export const TVX_OPTIONS = [
  { value: "rollup", label: "нарастание вверх с закруглением снизу" },
  { value: "rolldown", label: "медленное падение с закруглением сверху" },
  { value: "false_breakout", label: "Ложный пробой (без импульса за уровнем)" },
  { value: "false_breakout_cup", label: "После ложного пробоя нет отбоя, чашка на пробой" },
  { value: "level_bounce", label: "Отбой от сильного уровня" },
  { value: "retest", label: "Ретест от уровня в сторону пробоя" },
  { value: "breakout", label: "поджатие к уровню на пробой с наторговкой" },
  { value: "ipo_down", label: "Цена заходит за IPO" },
  { value: "inclined_level", label: "Выход из наклонного уровня" },
  { value: "ma_up", label: "Средняя скользящая показывает вверз" },
  { value: "ma_down", label: "Средняя скользящая показывает вниз" }
];

export const TVX_LABELS = TVX_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

export const getTvxLabel = (tvxValue) => {
  return TVX_LABELS[tvxValue] || tvxValue;
};

