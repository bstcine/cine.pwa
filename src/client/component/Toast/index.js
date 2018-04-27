import './index.less';
import React from 'react';
import { TransparentMask } from '../Mask';
import ToastSuccessComponent from './ToastSuccess';
import ToastLoadingComponent from './ToastLoading';
import ToastErrorComponent from './ToastError';

const ToastSuccess = ({ show, text }) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastSuccessComponent text={text} />
        </React.Fragment>
    );
};

const ToastLoading = ({ show, text }) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastLoadingComponent text={text} />
        </React.Fragment>
    );
};

const ToastError = ({ show, text }) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastErrorComponent text={text} />
        </React.Fragment>
    );
};

export { ToastSuccess, ToastLoading, ToastError };
