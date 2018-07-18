import './style.less';
import React from 'react';
import { Mask } from '../Mask';
import CButton from '../Button';

import { componentNames } from '@/component/_base/config';
const cls = componentNames.Dialog;

const Dialog = ({ isOpen, title, text, showCancel, onCancel, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className={cls}>
            <Mask />
            <div className={`${cls}__main`}>
                {title && <div className={`${cls}__header`}>{title}</div>}
                <div className={`${cls}__content`}>{text}</div>
                <div className={`${cls}__footer`}>
                    {showCancel && <CButton onClick={onCancel}>取消</CButton>}

                    <CButton color="primary" onClick={onConfirm}>
                        确定
                    </CButton>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
