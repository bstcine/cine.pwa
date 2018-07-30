import React from 'react';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Toast;
import './style.less';
import { TransparentMask } from '../Mask';

const Loading = ({ isOpen, text }) => {
    if (!isOpen) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <div className={cls}>
                <i className={`${cls}__icon loading`} />
                <p className={`${cls}__msg`}>{text || '加载中'}</p>
            </div>
        </React.Fragment>
    );
};

const Message = ({ isOpen, text, error }) => {
    if (!isOpen) return null;
    return (
        <React.Fragment>
            <TransparentMask />
            <div className={cls}>
                <i className={`${cls}__icon material-icons`}>
                    {!error ? `done` : `error_outline`}
                </i>
                <p className={`${cls}__msg`}>{text || error || '已完成'}</p>
            </div>
        </React.Fragment>
    );
};

export { Message as CMessage, Loading as CLoading };
