import axios from "axios";
import { AUTH_BASE_URL } from "../config/api";

const axiosInstance = axios.create({
  baseURL: `${AUTH_BASE_URL}/auth/signin`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;