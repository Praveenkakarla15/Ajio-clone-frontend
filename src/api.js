import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://ajio-clone-backend-6i71.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect if token expired
    }
    return Promise.reject(error);
  }
);

export default API;
