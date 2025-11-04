# Trading Journal Frontend

React приложение для просмотра журнала торговых позиций.

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

## Сборка

```bash
npm run build
```

## Конфигурация

По умолчанию приложение использует `http://localhost:3000/api` как базовый URL API.

Для изменения используйте переменную окружения:
```bash
VITE_API_BASE_URL=http://your-api-url/api npm run dev
```

## Структура компонентов

- `Filters` - Фильтры для поиска позиций
- `Stats` - Статистика по позициям
- `TradesList` - Список позиций
- `TradeCard` - Карточка отдельной позиции
- `ScreenshotModal` - Модальное окно для просмотра скриншотов

