import axios from "axios";

const api = axios.create({
  baseURL:"https://two-step-verification-1.onrender.com/api",
});

export default api;
