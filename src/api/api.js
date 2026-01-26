
import axios from "axios";

const api = axios.create({
  baseURL: "https://coreblog.coinswipe.xyz/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests EXCEPT auth routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
