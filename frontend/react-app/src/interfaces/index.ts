export interface IUser {
    id: string;
    name: string;
}

export interface IApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[];
    result: T;
}

export interface IAuthResponse {
    statusCode: number,
    isSuccess: boolean,
    errorMessages: string[];
    result: {
        accessToken: string;
        refreshToken: string;
        user: IUser
    },
}

export interface IAuthData {
    accessToken: string;
    refreshToken: string;
    user : IUser
}

