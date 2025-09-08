import axios from "axios";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
const instance : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/v1/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // You can add authorization headers or other custom headers here
        const token = localStorage.getItem('token');
        if (token) {
             config.headers.set("Authorization", `Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;
