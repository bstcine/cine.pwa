import './style.less';
import React from 'react';
import { CModal } from '@/component/_base';

/**
 * { title, text, onCancel, onConfirm }
 */
const open = function() {
    const { close } = CModal.open({
        children: (
            <div className="cine-d11-modal">
                <img
                    src={require('./fudai.png')}
                    alt=""
                    onClick={() => {
                        window.location.href = '/temp/d11';
                    }}
                />
                <span className="btn" onClick={xxClose}>
                    x
                </span>
            </div>
        ),
        maskClosable: true,
    });

    function xxClose() {
        close();
    }

    return {
        close,
    };
};

export { open };
