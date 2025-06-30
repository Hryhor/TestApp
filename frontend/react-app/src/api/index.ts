import axios from "axios";
import { IAuthResponse } from "../interfaces";

export const API_URL = `https://localhost:7265/api/Auth`;
//`http://localhost:5096/api/Auth`
//`https://localhost:7273/api/Auth`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (!['/register', '/login', '/refresh'].some(path => config.url?.includes(path))) {
        const token = localStorage.getItem('token');
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
    if (error.response.status = 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.result.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Пользователь не авторизован');
        }
    }
    throw error;
})

export default $api;