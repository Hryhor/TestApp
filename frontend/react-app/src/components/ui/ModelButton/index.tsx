import React, { ReactNode } from "react";

type ModalButton = {
    children: ReactNode;
    className?: string;
    id: string;
}

const ModalButton: React.FC<ModalButton> = ({ children, className, id }) => {
    const modalRef = React.useRef<HTMLDivElement | null>(null);

    const modalVisible = (id: string) => {
        const modal = document.querySelector(`.modal#${id}`);
        console.log('MODAL:', modal);
        modal?.classList.add('visible');
    };
    
    return(
        <button className={className} type="button" title="save all elements on server" onClick={() => modalVisible(id)}>
            { children }
        </button>
    )
}

export default ModalButton;
