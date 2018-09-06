import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './ModalContainer';
import QRCode from '../QRCode';

/**
 * { title, text, onCancel, onConfirm }
 */
Modal.alert = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { ...props, close, isOpen: true };

    function render(currentProps) {
        ReactDOM.render(<Modal {...currentProps} />, div);
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    render(currentProps);
    return {
        close,
    };
};

/**
 * url
 */
Modal.qrcode = QRCode.open;

export default Modal;
