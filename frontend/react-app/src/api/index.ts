import axios from "axios";

export const port = 7265;
export const API_URL = `http://localhost:${port}/api`;
export const API = `http://localhost:${port}`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('tokenA');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default $api;