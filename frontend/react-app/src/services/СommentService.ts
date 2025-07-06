import { AxiosResponse } from 'axios';
import $api from "../api/index";
import { IApiResponse , IComment, ICommentRequestDTO } from '../interfaces';

export default class CommentService {
    static async getComment({
        pageSize = 25,
        pageNumber = 1,
      }: {
        pageSize?: number;
        pageNumber?: number;
      }): Promise<AxiosResponse<IApiResponse<IComment[]>>> {
        return $api.get<IApiResponse<IComment[]>>(`/Comment?pageSize=${pageSize}&pageNumber=${pageNumber}`);
    };

    static async createComment(
      commentRequestDTO: ICommentRequestDTO,
      pageSize = 25,
      pageNumber = 1,
    ): Promise<AxiosResponse<IApiResponse<IComment>>> {
      return $api.post<IApiResponse<IComment>>(`/Comment?pageSize=${pageSize}&pageNumber=${pageNumber}`, commentRequestDTO);
  };
};