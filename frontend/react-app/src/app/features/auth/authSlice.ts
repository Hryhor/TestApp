import axios from 'axios';
import $api  from "../../../api/authApi";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthServices';
import { IUser, IAuthData, IRequestRefreshDto } from '../../../interfaces';


export const register = createAsyncThunk<IAuthData, { name: string, userName: string, email: string, password: string, role: string }, { rejectValue: string }>(
    '/api/register',
    async ({ name, userName, email, password, role }, { rejectWithValue }) => {
      try {
        const response = await AuthService.register(name, userName, email, password, role); // Возвращает IAuthResponse
        localStorage.setItem('tokenA',  response.data.result.accessToken);
        localStorage.setItem('tokenR', response.data.result.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.result.user));
        return response.data.result;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
      }
    }
);

export const login = createAsyncThunk<IAuthData, { email: string; password: string }, { rejectValue: string }>('/api/login', 
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('tokenA',  response.data.result.accessToken);
            localStorage.setItem('tokenR', response.data.result.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.data.result.user));
            console.log(response.data);
            return response.data.result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>('/api/logout', async (_, { rejectWithValue }) => {
    try {
        const refresh = localStorage.getItem('tokenR');
        if (!refresh) throw new Error("Refresh token not found");
        await AuthService.logout(refresh);
        localStorage.removeItem('tokenA');
        localStorage.removeItem('tokenR');
        localStorage.removeItem('user');
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message);
    }
});


export const checkAuth = createAsyncThunk<IAuthData, IRequestRefreshDto, { rejectValue: string }>(
    '/api/refresh', 
    async (requestRefreshDto, { rejectWithValue }) => {
        try {
            const response = await $api.post('/refresh', requestRefreshDto);
            //const response = await axios.post('/api/Auth/refresh',  { withCredentials: true });
            localStorage.setItem('tokenA',  response.data.result.accessToken);
            localStorage.setItem('tokenR', response.data.result.refreshToken);
            return response.data.result;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

interface IAuthState {
    user: IUser | null;
    isAuth: boolean;
    isLoading: boolean;
    error: any;
}

const initialState: IAuthState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: undefined, 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action: PayloadAction<IAuthData>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            });
        builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            });
        builder.addCase(register.fulfilled, (state, action: PayloadAction<IAuthData>) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
            });
        builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.user = null;
        })
        builder.addCase(logout.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.error = action.payload;
        });
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action: PayloadAction<IAuthData>) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload.user;
        });
        builder.addCase(checkAuth.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload;
        });
    }
});

export const { setAuth, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
