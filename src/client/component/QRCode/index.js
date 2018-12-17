import './style.less';
import React from 'react';
import qrcode from 'qrcode';
import QRCode from './QRCode';
import ReactDOM from 'react-dom';

/**
 * { title, text, onCancel, onConfirm }
 */
QRCode.open = function(url) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    function render(url, close) {

        ReactDOM.render(<QRCode url={url} close={close} />, div);
    }
    function close() {
        console.log('close');
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    qrcode
        .toDataURL(url, { width: 200 })
        .then(img_url => {
            render(img_url, close);
        })
        .catch(err => {
            alert(err);
        });
    return {
        close,
    };
};

export default QRCode;
