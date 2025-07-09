import axios from "axios";
import React, { useState, useEffect, ChangeEvent } from "react";
import { RootState } from "../app/store/store";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../app/hooks";
import { getComments, createComment } from "../app/features/comments/commentsSlice";
import Modal from "../components/ui/Modal";
import ModalBodyMain from "../components/ui/ModalBodyMain";
import ModalButton from "../components/ui/ModelButton";
import CommentItem from "../components/Commentitem";
import Sidebar from "../components/Sidebar";
import FileUploadButton from "../components/FileUploadButton";


const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const comments = useSelector((state: any) => state.comments.items);
    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [sortBy, setSortBy] = useState<string>("CreatedDate");
    const [descending, setDescending] = useState<boolean>(true);

    console.log(comments)

    useEffect(() => {
        dispatch(getComments({ pageSize: 25, pageNumber: currentPage, }));
    }, []);

    useEffect(() => {
        dispatch(getComments({ pageSize: 25, pageNumber: currentPage, sortBy, descending }));
    }, [currentPage, sortBy, descending  ]);


    const sort = (column: string) => {
        if (sortBy === column) {
            setDescending(!descending);
        } else {
            setSortBy(column);
            setDescending(false); 
        }
    };
    
    const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newComment = e.target.value;
        setNewComment(newComment);
    }

    function buildCommentTree(comments: any[]): any[] {
        const commentMap = new Map<number, any>();

        const clonedComments = comments.map(comment => ({ ...comment, replies: [] }));

        clonedComments.forEach(comment => {
            commentMap.set(comment.id, comment);
        });

        const tree: any[] = [];

        clonedComments.forEach(comment => {
            if (comment.parentId) {
                const parent = commentMap.get(comment.parentId);
                if (parent) {
                    parent.replies.push(comment);
                }
            } else {
                tree.push(comment);
            }
        });
        return tree;
    } 

    const submit = async () => {
        const commentRequestDTO  = {
            parentId: null,
            Text: newComment
        }

        const formData = new FormData();
        
        if (file) {
            formData.append("File", file);
        }

        if (!auth.isAuth || !auth.user) {
            alert("Please register or log in to leave a comment.");
            return;
        } else {
            await dispatch(createComment({commentRequestDTO, ...(file && { file }), pageSize: 25, pageNumber: 1, }));
            await dispatch(getComments({ pageSize: 25, pageNumber: 1 }));
            setNewComment(''); 
        }
    }

    return(
        <div>
            <Sidebar />
            
            <div className='main-area'>
                <div className='container'>
                    <div className="main-area__header">
                        <div>
                            <ModalButton id="newComment" >new comment</ModalButton >
                        </div>
                    </div>
                    <div className="main-area__content">
                        <table>
                            <thead>
                                <tr>
                                    <th onClick={() => sort("userName")}>
                                        UserName {sortBy === "userName" ? (descending ? "↓" : "↑") : ""}
                                    </th>
                                    <th onClick={() => sort("email")}>
                                        Email {sortBy === "email" ? (descending ? "↓" : "↑") : ""}
                                    </th>
                                    <th onClick={() => sort("createdDate")}>
                                        Дата {sortBy === "createdDate" ? (descending ? "↓" : "↑") : ""}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                comments.map((comment: any) => (
                                    <CommentItem key={comment.id} comment={comment} />
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="main-area__footer">
                        <div className="pagination">
                            <button className="pagination__btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Back</button>
                            <span>Page {currentPage}</span>
                            <button className="pagination__btn" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </div>
                    </div>
                </div>  
            </div>

            <Modal id="newComment">
                <ModalBodyMain>
                    <div>
                        <textarea 
                            className="comment-сreate" 
                            placeholder="your answer"
                            onChange={onChangeComment}
                        >  
                        </textarea>
                        <div className="comment-btn-block">
                            <FileUploadButton 
                                onFileSelect={(selectedFile) => setFile(selectedFile)}
                            />

                            <button onClick={submit}>send</button>
                        </div>
                    </div>  
                </ModalBodyMain>
            </Modal>
        </div>
    )
}

export default Home;