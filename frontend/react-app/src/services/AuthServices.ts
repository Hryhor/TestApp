import $api from '../api/authApi';
import { IAuthResponse } from '../interfaces';
import type { AxiosResponse } from 'axios';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/login', {email, password});
    }

    static async register(name: string, userName: string, email: string, password: string, role: string): Promise<AxiosResponse<IAuthResponse>> {
        return $api.post<IAuthResponse>('/register', {name, userName, email, password, role});
    }
        
    static async logout(token: string):  Promise<string> {
        return $api.post('/logout', { refreshToken: token });
    }
}