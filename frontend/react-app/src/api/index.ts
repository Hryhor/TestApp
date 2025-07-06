import axios from "axios";

export const API_URL = `https://localhost:7265/api`;

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