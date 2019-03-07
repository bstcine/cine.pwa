import './style.less';
import React from 'react';
import { CModal } from '@/component/_base';
import QRCode from './QRCode';

/**
 * { title, text, onCancel, onConfirm }
 */
QRCode.open = function(url) {
    const { close } = CModal.open({
        children: <QRCode url={url} close={xxClose} />,
        maskClosable: true,
    });

    function xxClose() {
        close();
    }
    return {
        close,
    };
};

export default QRCode;
