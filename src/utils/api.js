const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const fetchHistoryPositions = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.symbol) params.append('symbol', filters.symbol);
  if (filters.direction) params.append('direction', filters.direction);
  if (filters.tvx) params.append('tvx', filters.tvx);
  if (filters.session) params.append('session', filters.session);
  if (filters.sourceType) params.append('sourceType', filters.sourceType);
  if (filters.status) params.append('status', filters.status);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.offset) params.append('offset', filters.offset);

  const url = `${API_BASE_URL}/trades/history_positions?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch positions: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchTvxList = async () => {
  const url = `${API_BASE_URL}/trades/tvx_list`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch TVX list: ${response.statusText}`);
  }

  const data = await response.json();
  return data.tvxList || [];
};

export const fetchStats = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.symbol) params.append('symbol', filters.symbol);
  if (filters.direction) params.append('direction', filters.direction);
  if (filters.tvx) params.append('tvx', filters.tvx);
  if (filters.session) params.append('session', filters.session);
  if (filters.sourceType) params.append('sourceType', filters.sourceType);
  if (filters.status) params.append('status', filters.status);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);

  const url = `${API_BASE_URL}/trades/stats?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }

  return await response.json();
};

export const getScreenshotUrl = (screenshotPath) => {
  if (!screenshotPath) return null;
  
  if (screenshotPath.startsWith('http://') || screenshotPath.startsWith('https://')) {
    return screenshotPath;
  }
  
  const baseUrl = API_BASE_URL.replace('/api', '');
  
  if (screenshotPath.startsWith('/api/screenshots/')) {
    return `${baseUrl}${screenshotPath}`;
  }
  
  if (screenshotPath.startsWith('/')) {
    return `${baseUrl}${screenshotPath}`;
  }
  
  return `${baseUrl}/api/screenshots/${screenshotPath}`;
};

export const deleteTrade = async (id) => {
  const url = `${API_BASE_URL}/trades/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete trade');
  }

  return await response.json();
};

export const updatePositionTvx = async (id, tvx) => {
  const url = `${API_BASE_URL}/positions/${id}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tvx })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || 'Failed to update position');
  }

  return await response.json();
};

