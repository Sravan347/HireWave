
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const forgotPassword = (email) => API.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  API.post(`/auth/reset-password/${token}`, { password });

export default API;
