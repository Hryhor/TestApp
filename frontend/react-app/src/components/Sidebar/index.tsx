import React, { ChangeEvent,  useRef, useState }from 'react';
import  { useSelector } from 'react-redux';
import {  RootState } from "../../app/store/store";
import { useAppDispatch } from '../../app/hooks';
import { logout } from "../../app/features/auth/authSlice";
//components 
import Modal from '../ui/Modal';
import ModalButton from '../ui/ModelButton';
import ModalBodyMain from '../ui/ModalBodyMain';
import FormLogin from '../FormLogin';
import FormRegister from '../FormRegister';


interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
 

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const signInModalRef = useRef<HTMLDivElement>(null);
    const signUpModalRef = useRef<HTMLDivElement>(null);

    const closeSignUpModal = () => {
        signUpModalRef.current?.classList.remove("visible");
    };

    const closeSignInModal = () => {
        signInModalRef.current?.classList.remove("visible");
    };

    const submit = async () => {
        await dispatch(logout());
    }

    return(
        <>
        <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
            <header className="sidebar__header">
                <div className="person__block">
                    <div className="person__avatar">    
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="person__icon" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </div>
                </div>
            </header>
            <div className="sidebar__main-content">
                <div>
                    {auth.user ? 
                        (
                            <div>
                                <button className="person__item-btn" onClick={submit}>Logout</button>
                            </div>
                        ) : (
                            <ul className="person__menu">
                                <li className="person__item">
                                    <ModalButton modalRef={signInModalRef}  className="person__item-btn">
                                        Sign In
            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="person__icon" viewBox="0 0 16 16">
                                            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
                                        </svg>
                                    </ModalButton>
                                </li>
                                <li className='person__item'>
                                    <ModalButton modalRef={signUpModalRef}  className='person__item-btn'>
                                        Sign Up
            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="person__icon" viewBox="0 0 16 16">
                                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </ModalButton>
                                </li>
                            </ul>
                        )
                    }
                </div>
                <div className="sidebar__wrap-btn">
                    <button className="sidebar__close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" className="" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

            <Modal ref={signInModalRef}>
                <ModalBodyMain>
                    <FormLogin  onClose={closeSignInModal} />
                </ModalBodyMain>
            </Modal>

            <Modal ref={signUpModalRef}>
                <ModalBodyMain>
                    <FormRegister onClose={closeSignUpModal} />
                </ModalBodyMain>
            </Modal>
        </>
    )
}
export default Sidebar;