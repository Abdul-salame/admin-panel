
// Updated api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://coreblog.coinswipe.xyz/api/v1";

const parseResponse = async (response) => {
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    // This is where your "Invalid or expired token" error is caught
    const error = new Error(data?.message || response.statusText || "API request failed");
    error.response = { data, status: response.status, statusText: response.statusText };
    throw error;
  }
  return { data, status: response.status, statusText: response.statusText };
};

const buildUrl = (path) => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return path.startsWith("http") ? path : `${BASE_URL}${cleanPath}`;
};

const request = async (method, path, payload, config = {}) => {
  const url = buildUrl(path);
  
  // 1. Get the token from localStorage (Check if your app uses a different key name like 'auth_token')
  const token = localStorage.getItem("token"); 

  const headers = { 
    ...(config.headers || {}),
    // 2. Attach the Authorization header if the token exists
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let body;

  if (payload instanceof FormData) {
    delete headers["Content-Type"];
    body = payload;
  } else if (payload != null) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    body = JSON.stringify(payload);
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  return parseResponse(response);
};

const api = {
  get: (path, config) => request("GET", path, null, config),
  post: (path, data, config) => request("POST", path, data, config),
  put: (path, data, config) => request("PUT", path, data, config),
  delete: (path, config) => request("DELETE", path, null, config),
};

export default api;