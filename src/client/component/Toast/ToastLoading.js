import React from 'react';

const ToastLoading = ({text}) => {
    return (
        <div className="cine-toast">
            <i className="loading" />
            <p>{text || '加载中'}</p>
        </div>
    );
};

export default ToastLoading;
