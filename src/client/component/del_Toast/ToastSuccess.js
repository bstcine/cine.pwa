import React from 'react';

const ToastSuccess = ({text}) => {
    return (
        <div className="cine-toast">
            <i className="material-icons">&#xE876;</i>
            <p>{text || '已完成'}</p>
        </div>

    );
};

export default ToastSuccess;