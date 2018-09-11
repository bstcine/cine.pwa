import './style.less';
import React from 'react';
import Mask from '../Mask';
import CButton from '../Button';

import { componentNames } from '../config';
const cls = componentNames.Modal;

export default function({ title, text, onCancel, onConfirm, close }) {
    return (
        <div className={cls}>
            <Mask />
            <div className={`${cls}__main`}>
                {title && <div className={`${cls}__header`}>{title}</div>}
                <div className={`${cls}__content`}>{text}</div>
                <div className={`${cls}__footer`}>
                    {onCancel && (
                        <CButton
                            className={`${cls}__cancel`}
                            onClick={() => {
                                close();
                                onCancel();
                            }}>
                            取消
                        </CButton>
                    )}

                    <CButton
                        color="primary"
                        onClick={() => {
                            close();
                            onConfirm && onConfirm();
                        }}>
                        确定
                    </CButton>
                </div>
            </div>
        </div>
    );
}