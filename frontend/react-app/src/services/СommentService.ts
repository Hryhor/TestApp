import { AxiosResponse } from 'axios';
import $api from "../api/index";
import { IApiResponse , IComment, ICommentRequestDTO } from '../interfaces';

export default class CommentService {
    static async getComment({
        pageSize = 25,
        pageNumber = 1,
        sortBy,
        descending = false
      }: {
        pageSize?: number;
        pageNumber?: number;
        sortBy?: string;
        descending?: boolean;
      }): Promise<AxiosResponse<IApiResponse<IComment[]>>> {
        let query = `/Comment?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        if (sortBy) query += `&sortBy=${sortBy}`;
        if (descending) query += `&descending=true`;
        return $api.get<IApiResponse<IComment[]>>(query);
    };

    static async createComment(
      formData: FormData,
      //commentRequestDTO: ICommentRequestDTO,
      pageSize = 25,
      pageNumber = 1,
    ): Promise<AxiosResponse<IApiResponse<IComment>>> {
      return $api.post<IApiResponse<IComment>>(`/Comment?pageSize=${pageSize}&pageNumber=${pageNumber}`, formData);
  };
};