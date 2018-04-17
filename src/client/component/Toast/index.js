import './index.less';
import React from 'react';
import {TransparentMask} from '../Mask';
import ToastSuccessComponent from './ToastSuccess';
import ToastLoadingComponent from './ToastLoading';
import ToastFailComponent from './ToastFail';

const ToastSuccess = ({show, text}) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastSuccessComponent text={text} />
        </React.Fragment>
    );
};

const ToastLoading = ({show, text}) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastLoadingComponent text={text} />
        </React.Fragment>
    );
};

const ToastFail = ({show, text}) => {
    if (!show) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <ToastFailComponent text={text} />
        </React.Fragment>
    );
};

export {ToastSuccess, ToastLoading, ToastFail};
