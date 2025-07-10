import React, { forwardRef } from 'react';
import closeImage from '../../../app/assets/images/close.svg';
import ModalHeader from '../ModalHeader';

type ModalProps = {
    children: React.ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children }, ref) => {
    const closeModal = () => {
        if (ref && typeof ref !== 'function' && ref.current) {
            ref.current.classList.remove('visible');
        }
    };

    return(
        <div ref={ref} className='modal'>
            <div className='modalBody'>
                <ModalHeader>
                    <button className='modalBodyBtnClose' onClick={closeModal}>
                        <img src={closeImage} alt='close' />
                    </button>
                </ModalHeader>
                { children }
            </div>
        </div>
    )
});

export default Modal;