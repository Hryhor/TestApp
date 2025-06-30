import React from "react";

type ModalHeader = {
    children: React.ReactNode;
}

const ModalHeader: React.FC<ModalHeader> = ({ children }) => {
    return(
        <div className="modalBodyHeader">
            { children }
        </div>
    )
}

export default ModalHeader;