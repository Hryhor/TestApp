export interface IUser {
    id: string;
    name: string;
    email: string;
    userName: string;
    role: string;
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

export interface IComment {
    id: number,
    text: string;
    parentId: number | null,
    userName: string,
    createdDate: number,
    updatedDate: number,
    email: string | null,
    filePath: string| null,
    fileName: string| null,
    contentType: string| null,
    replies?: IComment
}

export interface IRequestRefreshDto  {
    refreshToken: string | null,
    userDTO: IUser,
};

export interface ICommentRequestDTO {
    parentId: number | null,
    Text: string,
    file?: File,
}




