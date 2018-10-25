import React, { Component } from 'react';
import ReactModal from 'react-modal';
import '@/asset/style/modal.less';

export default class QRModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { isOpen, onRequestClose, code_url, pay_price } = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ariaHideApp={false}
                className="modal qr-modal"
                overlayClassName="modal-overlay"
                bodyOpenClassName="body-modal-open"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <div className="modal-header">
                    <span className="modal-title">微信扫码支付：</span>
                    <i
                        className="modal-close material-icons"
                        onClick={onRequestClose}
                    >
                        &#xE5CD;
                    </i>
                </div>
                <div className="modal-body">
                    <div className="qr-brief">
                        当前支付<span className="qr-price"> {pay_price} </span>元
                    </div>
                    <div className="wechatqr">
                        <img src={code_url} alt="qrcode" />
                    </div>
                    <div className="qr-desc">打开手机微信，扫一扫 继续付款</div>
                </div>
            </ReactModal>
        );
    }
}
