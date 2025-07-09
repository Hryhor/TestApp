import React, { useState, ChangeEvent } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store/store";
import { useAppDispatch } from "../../app/hooks";
import { getComments, createComment } from "../../app/features/comments/commentsSlice"
import FileUploadButton from "../FileUploadButton";
import { formatDate } from "../../utils/formatDate";
import { API } from "../../api"

const CommentItem = ({ comment }: { comment: any }) => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const [newComment, setNewComment] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const submit = async () => {
        const commentRequestDTO  = {
            parentId: comment.id,
            Text: newComment
        };

        if (!auth.isAuth || !auth.user) {
            alert("Please register or log in to leave a comment.");
            return;
        } else {
            await dispatch(createComment({commentRequestDTO, pageSize: 25, pageNumber: 1}));
            await dispatch(getComments({ pageSize: 25, pageNumber: 1 }));
            setNewComment(""); 
        }
    };

    return (
        <>
            <tr>
                <td style={{ textAlign: 'center' }}>{comment.userName}</td>
                <td style={{ textAlign: 'center' }}>{comment.email}</td>
                <td style={{ textAlign: 'center' }}>{formatDate(comment.createdDate)}</td>
            </tr>
            <tr>
                <td colSpan={3} style={{ paddingLeft: comment.parentId ? 30 : 0 }}>
                    <p className="comm-text">{comment.text}</p>
                    {comment.filePath && (
                        <div className="file-preview" style={{ marginTop: 10 }}>
                            {comment.contentType?.startsWith("image/") ? (
                                <img
                                    src={API + comment.filePath}
                                    alt={comment.fileName}
                                    style={{ maxWidth: "100%", maxHeight: 300 }}
                                />
                            ) : (
                                <div>
                                    📄 <a href={API + comment.filePath} download target="_blank" rel="noopener noreferrer">
                                        {comment.fileName}
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    <textarea 
                        onChange={onChangeComment}
                        className="comment-сreate" 
                        placeholder="your answer">
                    </textarea>

                    <div className="comment-btn-block">
                        <FileUploadButton 
                            onFileSelect={(selectedFile) => setFile(selectedFile)}
                        />
                        <button onClick={submit}>send</button>
                    </div>

                    {comment.replies && comment.replies.length > 0 && (
                        <table>
                            <tbody>
                                {comment.replies.map((reply: any) => (
                                    <CommentItem key={reply.id} comment={reply} />
                                ))}
                            </tbody>
                        </table>
                    )}
                </td>
            </tr>
        </>
    );
};


export default CommentItem;