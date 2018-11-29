import QRHelp from './QRHelp';
import './style.less';
import ReactDOM from 'react-dom';
import React from 'react';

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
    const props = map[who];
    function render(close) {
        console.log('render', close);
        ReactDOM.render(<QRHelp {...props} close={close} />, div);
    }
    function close() {
        console.log('close');
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const div = document.createElement('div');
    document.body.appendChild(div);
    render(close);
};
