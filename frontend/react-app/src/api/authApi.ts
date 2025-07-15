import axios from "axios";
import { IAuthResponse } from "../interfaces";

export const port = 7265;
export const API_URL = `${process.env.REACT_APP_API_URL}/api/Auth`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (!['/register', '/login', '/refresh'].some(path => config.url?.includes(path))) {
        const token = localStorage.getItem('tokenR');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('tokenA', response.data.result.accessToken);
            localStorage.setItem('tokenR', response.data.result.refreshToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован');
        }
    }
    throw error;
})

export default $api;