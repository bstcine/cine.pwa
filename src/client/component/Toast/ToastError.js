import React from 'react';

const ToastError = ({text}) => {
    return (
        <div className="cine-toast">
            <i className="material-icons">&#xE000;</i>
            <p>{text || '网络异常'}</p>
        </div>
    );
};

export default ToastError;