import React from 'react';


const Sceleton: React.FC = () => {
    return(
        <>
        {
            Array(11).fill(null).map((_, index) => (
                <tr key={`skeleton-${index}`} className="skeleton-row">
                    <td>
                        <div className="skeleton skeleton-text skeleton-username"></div>
                    </td>
                    <td>
                        <div className="skeleton skeleton-text skeleton-email"></div>
                    </td>
                    <td>
                        <div className="skeleton skeleton-text skeleton-date"></div>
                    </td>
                </tr>
            ))
        }
        </>                     
    )
}

export default Sceleton;