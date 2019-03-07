import QRHelp from './QRHelp';
import './style.less';
import React from 'react';
import { CModal } from "@/component/_base";

export default QRHelp;

const map = {
    xzs: {
        img: require('@/asset/image/qrcode_bst02.jpg'),
        h1: '微信“扫一扫”, 联系善恩小助手',
        h2: '(微信号：BSTCINE02)',
    },
    alice: {
        img: require('@/asset/image/qrcode_Alice.jpg'),
        h1: '微信“扫一扫”, 联系Alice老师',
        h2: '(微信号：iYuan1023)',
    },
    nancy: {
        img: require('@/asset/image/qrcode_Nancy.jpg'),
        h1: '微信“扫一扫”, 联系Nancy老师',
        h2: '(微信号：WELNANQLU)',
    },
};

QRHelp.open = function(who = 'xzs') {
    const props = map[who] || map['xzs'];
    const { close } = CModal.open({
        children: <QRHelp {...props} close={_close} />,
        maskClosable: true,
    });

    function _close() {
        close();
    }
    return {
        close,
    };
};
