import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://two-step-verification-1.onrender.com/api",
});

export default api;
