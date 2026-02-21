import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/auth/signin", // your backend base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token is"+" "+token);

    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;