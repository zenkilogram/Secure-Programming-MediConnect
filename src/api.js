import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const getCSRFToken = () =>
  api.get("/sanctum/csrf-cookie");

export default api;