export const TVX_OPTIONS = [
  { value: "waves", label: "5 волн + ABC" },
  { value: "level_breakout", label: "Пробой сильного уровня (Ретест)" },
  { value: "false_breakout", label: "Ложный пробой сильного(Вкат за уровень)" },
  { value: "level_bounce", label: "Отбой от сильного уровня" },
  { value: "imbalance_retest", label: "Ретест от Имбаланса" },
  { value: "ma20_retest", label: "Ретест МА20" },
  { value: "ma20_curve", label: "Рогатка МА20 + маленькая свеча" },
  { value: "ma200_retest", label: "Ретест МА200" },
  { value: "ma_rectangle", label: "Треугольник пробой МА200" },
  { value: "rollback25", label: "Откат 25%" },
  { value: "rollback50", label: "Разворот после отката 50%" },
];

export const TVX_LABELS = TVX_OPTIONS.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

export const getTvxLabel = (tvxValue) => {
  return TVX_LABELS[tvxValue] || tvxValue;
};

