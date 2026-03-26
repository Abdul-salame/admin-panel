
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://coreblog.coinswipe.xyz/api/v1";

const parseResponse = async (response) => {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };                               
  }

  if (!response.ok) {
    const error = new Error(data.message || `Error ${response.status}`);
    error.response = { data, status: response.status };
    throw error;
  }
  return { data, status: response.status };
};

const request = async (method, path, payload, config = {}) => {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const token = localStorage.getItem("token"); 

  const headers = { 
    ...(config.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let body;
  if (payload instanceof FormData) {
  
    body = payload;
  } else if (payload != null) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(payload);
  }

  const response = await fetch(url, { method, headers, body });
  return parseResponse(response);
};

const api = {
  get: (path, config) => request("GET", path, null, config),
  post: (path, data, config) => request("POST", path, data, config),
  put: (path, data, config) => request("PUT", path, data, config),
  delete: (path, config) => request("DELETE", path, null, config),
};

export default api;