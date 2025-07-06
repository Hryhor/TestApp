import axios from "axios";
import React, { useEffect, ChangeEvent } from "react";
import {  RootState } from "../app/store/store";
import { useSelector } from 'react-redux';
import { useAppDispatch } from "../app/hooks";
import { getComments, createComment } from "../app/features/comments/commentsSlice";
import Modal from "../components/ui/Modal";
import ModalBodyMain from "../components/ui/ModalBodyMain";
import ModalButton from "../components/ui/ModelButton";
import CommentItem from "../components/Commentitem";
import { formatDate } from "../utils/formatDate";
//avatar
import avatarImg from "../app/assets/images/avatar.jpg";
import Sidebar from "../components/Sidebar";
import SortArea from "../components/SortArea";


const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const comments = useSelector((state: any) => state.comments.items);
    const [newComment, setNewComment] = React.useState("");

    useEffect(() => {
        dispatch(getComments({ pageSize: 25, pageNumber: 1 }));
    }, []);

    
    const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newComment = e.target.value;
        setNewComment(newComment);
    }

    const sort = (sortByParametr: string) => {
        console.log('sort')
    };

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

    const commentTree = buildCommentTree(comments);

    const submit = async () => {
        const commentRequestDTO  = {
            parentId: null,
            Text: newComment
        }

        if (!auth.isAuth || !auth.user) {
            alert("Please register or log in to leave a comment.");
            return;
        } else {
            await dispatch(createComment({commentRequestDTO, pageSize: 25, pageNumber: 1, }));
            await dispatch(getComments({ pageSize: 25, pageNumber: 1 }));
            setNewComment(''); 
        }
    }

    return(
        <div>
            <Sidebar />
            
            <div className='main-area'>
                <div className='container'>
                    <div className="mani-area__header">
                        <SortArea />
                        <div>
                            <ModalButton id="newComment" >new comment</ModalButton >
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sort('userName')}>UserName</th>
                                <th onClick={() => sort('email')}>Email</th>
                                <th onClick={() => sort('date')}>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            commentTree.map((comment: any) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))
                        }
                        </tbody>
                    </table>
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
                            <input type="file" accept="image/*" className="upload-image-input" />
                            <button onClick={submit}>send</button>
                        </div>
                    </div>  
                </ModalBodyMain>
            </Modal>
        </div>
    )
}

export default Home;