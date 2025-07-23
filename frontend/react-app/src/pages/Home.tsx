import axios from "axios";
import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "../app/store/store";
import { useAppDispatch } from "../app/hooks";
import { getComments, createComment } from "../app/features/comments/commentsSlice";
//components
import Modal from "../components/ui/Modal";
import ModalBodyMain from "../components/ui/ModalBodyMain";
import ModalButton from "../components/ui/ModelButton";
import CommentItem from "../components/Commentitem";
import Sidebar from "../components/Sidebar";
import FileUploadButton from "../components/FileUploadButton";
import Sceleton from "../components/Sceleton";
import { API_URL } from "../api";


const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const comments = useSelector((state: any) => state.comments.items);

    const modalRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [newComment, setNewComment] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [sortBy, setSortBy] = useState<string>("CreatedDate");
    const [descending, setDescending] = useState<boolean>(true);

    const [captchaId, setCaptchaId] = useState("");
    const [captchaUrl, setCaptchaUrl] = useState("");
    const [userInput, setUserInput] = useState("");
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(prev => !prev);
    };

    const closeSidebar = () => setSidebarOpen(false);

    const loadCaptcha = async () => {
        try {
            const res = await fetch(`${API_URL}/captcha/generate`);
            const blob = await res.blob();
            const id = res.headers.get("Captcha-Id")!;

            setCaptchaId(id);
            setCaptchaUrl(URL.createObjectURL(blob));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const init = async () => {
            await loadCaptcha();
            dispatch(getComments({ pageSize: 25, pageNumber: currentPage }));
        };
    
        init();
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
   
    const handleSubmit = async (): Promise<boolean> => {
        if (!captchaId) {
            alert("CAPTCHA не загружена. Попробуйте ещё раз.");
            await loadCaptcha();
            return false;
        }

        try {
            const result = await axios.post(`${API_URL}/captcha/validate`, {
                captchaId,
                userInput,
            });
    
            if (result.data.isValid) {
                return true;
            } else {
                alert("Неверная CAPTCHA");
                loadCaptcha();
                return false;
            }
        } catch (err) {
            alert("Ошибка проверки CAPTCHA");
            console.error(err);
            return false;
        }
    };

    const submit = async () => {
        if (!showCaptcha) {
            setShowCaptcha(true);
            await loadCaptcha();
            return;
        }

        const isValid = await handleSubmit();
        if (!isValid) return;

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

            setUserInput('');
            setFile(null);
            setShowCaptcha(false);
        }

        if (modalRef.current) {
            modalRef.current.classList.remove("visible");
        }
    }

    return(
        <div className="flex-container">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            
            <div className="main-area flex-container">
                <div className="container">
                    <div className="main-area__header">
                        <button className="mobile-nav__btn" onClick={toggleSidebar}> 
                            <span className="mobile-nav__btn--icon"></span>
                        </button>
                        <ModalButton className={"crate-comment__btn"} modalRef={modalRef}>new comment</ModalButton >
                    </div>
                    <div className="main-area__content flex-container">
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
                            {   comments.length === 0 ? (
                                <Sceleton />              
                                ) : (
                                comments.map((comment: any) => (
                                    <CommentItem key={comment.id} comment={comment} />
                                )))
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

            <Modal ref={modalRef}>
                <ModalBodyMain>
                    <div>
                        <textarea 
                            className="comment-сreate" 
                            placeholder="your answer"
                            onChange={onChangeComment}
                        >  
                        </textarea>
                        { showCaptcha && (
                            <div className="captcha-block">
                                <img src={captchaUrl} alt="Captcha" />
                                <input
                                    type="text"
                                    placeholder="Enter CAPTCHA"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                />
                            </div>
                        )}
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