// src/config/apiConfig.ts
export const API_BASE_URL =
  // Check if window._env_ exists (a common pattern for runtime env variables)
  (window as any)._env_?.REACT_APP_API_URL ||
  // Or use a hardcoded fallback URL for development
  "https://api.your-electronics-store.com/api";
