import React from 'react';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Toast;

const ToastError = ({ text }) => {
    return (
        <div className={cls}>
            <i className={`${cls}__icon material-icons`}>&#xE000;</i>
            <p>{text || '网络异常'}</p>
        </div>
    );
};

const ToastLoading = ({ text }) => {
    return (
        <div className={cls}>
            <i className={`${cls}__icon loading`} />
            <p>{text || '加载中'}</p>
        </div>
    );
};

const ToastSuccess = ({ text }) => {
    return (
        <div className={cls}>
            <i className={`${cls}__icon material-icons`}>&#xE876;</i>
            <p>{text || '已完成'}</p>
        </div>
    );
};

export {
    ToastError as CToastError,
    ToastLoading as CToastLoading,
    ToastSuccess as CToastSuccess,
};
