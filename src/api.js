// File: src/api.js
import axios from "axios";

const api = axios.create({
  // URL Backend temanmu (pastikan port-nya benar, biasanya 8000)
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Otomatis selipkan Token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pastikan ini sama dengan yang dipakai di Login.jsx temanmu
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;