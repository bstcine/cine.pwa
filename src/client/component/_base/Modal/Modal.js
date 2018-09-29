import './style.less';
import React from 'react';
import Mask from '../Mask';
import CButton from '../Button';
import classNames from 'classnames';
import { componentNames } from '../config';
const cls = componentNames.Modal;

export default function({ title, text, reposive, onCancel, onConfirm, close }) {
    return (
        <div className={cls}>
            <Mask />
            <div
                className={classNames(`${cls}__main`, {
                    [`${cls}__main--reposive`]: reposive,
                })}>
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
