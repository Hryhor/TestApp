import React from "react";

type ModalBodyMainProp = {
    children: React.ReactNode
}

const ModalBodyMain: React.FC<ModalBodyMainProp> = ({ children }) => {
    return(
        <div  className="modalBodyMain">
            { children }
        </div>
    )
}

export default ModalBodyMain;