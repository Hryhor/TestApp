import React from 'react';
import closeImage from '../../../app/assets/images/close.svg';
import ModalHeader from '../ModalHeader';

type ModalProps = {
    children: React.ReactNode;
    id: string
}

const Modal: React.FC<ModalProps> = ({ children, id }) => {
    
    const closeModal = (id: string) => {
        const modal = document.querySelector(`.modal#${id}`);
        modal?.classList.remove('visible');
    }

    return(
        <div id={id} className='modal'>
            <div className='modalBody'>
                <ModalHeader>
                    <button className='modalBodyBtnClose' onClick={() => closeModal(id)}>
                        <img src={closeImage} alt='close'></img>
                    </button>
                </ModalHeader>
                { children }
            </div>
        </div>
    )
}

export default Modal;