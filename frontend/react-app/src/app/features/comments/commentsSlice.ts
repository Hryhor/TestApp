import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../../interfaces';
import CommentService  from '../../../services/СommentService';
import { ICommentRequestDTO } from '../../../interfaces';


export const getComments = createAsyncThunk<IComment[], { pageSize?: number, pageNumber?: number, sortBy?: string, descending?: boolean }, { rejectValue: string }>(
    'comments/getAll',
    async ({ pageSize = 25, pageNumber = 1, sortBy, descending }, { rejectWithValue }) => {
        try {
            const response = await CommentService.getComment({pageSize, pageNumber, sortBy, descending });
            return response.data.result;
        } 
        catch (error: any) {
            return rejectWithValue('Не удалось загрузить комментарии');
        }
    }
);

export const createComment = createAsyncThunk<IComment, { commentRequestDTO: ICommentRequestDTO; file?: File; pageSize?: number; pageNumber?: number }, { rejectValue: string }>(
    '/api/Comment',
    async ({commentRequestDTO, file, pageSize, pageNumber }, { rejectWithValue }) => {
        try{
            const formData = new FormData();
            formData.append("Text", commentRequestDTO.Text);
            if (commentRequestDTO.parentId !== null) {
                formData.append("ParentId", commentRequestDTO.parentId.toString());
              }
            if (file) {
                formData.append("file", file);
            }
            const response = await CommentService.createComment(formData, pageSize, pageNumber);
            return response.data.result;
        }catch(error: any){
            return rejectWithValue(error.response?.data?.message);
        }
   }
);

interface ICommentsState {
    items: IComment[];
    isLoading: boolean;
    error: any;
}

const initialState: ICommentsState = {
    items: [],
    isLoading: false,
    error: undefined, 
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });  
        builder.addCase(getComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
            state.isLoading = false;
            state.items = action.payload; 
        });
        builder.addCase(getComments.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        //
        builder.addCase(createComment.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });  
        builder.addCase(createComment.fulfilled, (state, action: PayloadAction<IComment>) => {
            state.isLoading = false;
            //state.items.push(action.payload);
            state.items.unshift(action.payload);
        });
        builder.addCase(createComment.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export default commentsSlice.reducer;