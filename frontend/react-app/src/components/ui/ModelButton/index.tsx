import React, { ReactNode, RefObject} from "react";


type ModalButton = {
    children: ReactNode;
    className?: string;
    modalRef?: RefObject<HTMLDivElement | null>;
}

const ModalButton: React.FC<ModalButton> = ({ children, className,  modalRef }) => {
    const handleClick = () => {
        if (modalRef?.current) {
          modalRef.current.classList.add("visible");
        }
      };
    
    return(
        <button className={className} type="button" title="save all elements on server" onClick={handleClick}>
            { children }
        </button>
    )
}

export default ModalButton;
