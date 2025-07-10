import React, { ChangeEvent,  useRef, useState }from 'react';
import  { useSelector } from 'react-redux';
import {  RootState } from "../../app/store/store";
//images
import imgAvatar from '../../app/assets/images/person.svg';
import imgSignUp from '../../app/assets/images/person-plus.svg';
import imgSignIn from '../../app/assets/images/person-lock.svg';
//components 
import Modal from '../ui/Modal';
import ModalButton from '../ui/ModelButton';
import ModalBodyMain from '../ui/ModalBodyMain';
import FormLogin from '../FormLogin';
import FormRegister from '../FormRegister';


const Sidebar: React.FC = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const signInModalRef = useRef<HTMLDivElement>(null);
    const signUpModalRef = useRef<HTMLDivElement>(null);

    const closeSignUpModal = () => {
        signUpModalRef.current?.classList.remove("visible");
    };

    const closeSignInModal = () => {
        signInModalRef.current?.classList.remove("visible");
    };


    return(
        <div className='sidebar'>
            <header className='sidebar__header'>
                <div className='person__block'>
                    <div className='person__avatar'>
                        <img src={imgAvatar} alt='' />
                    </div>
                </div>
            </header>
            <div>
                {auth.user ? 
                    (
                        <div>
                            <button>Logout</button>
                        </div>
                    ) : (
                        <ul className='person__menu'>
                            <li className='person__item'>
                                <ModalButton modalRef={signInModalRef}  className='person__item-btn'>
                                    Sign In
        
                                    <img src={imgSignIn} alt='' />
                                </ModalButton>
                            </li>
                            <li className='person__item'>
                                <ModalButton modalRef={signUpModalRef}  className='person__item-btn'>
                                    Sign Up
        
                                    <img src={imgSignUp} alt='' />
                                </ModalButton>
                            </li>
                        </ul>
                    )
                }
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
        </div>
    )
}
export default Sidebar;