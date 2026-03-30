import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://comfortable-balance-production-4f82.up.railway.app/auth/signin", // your backend base URL
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