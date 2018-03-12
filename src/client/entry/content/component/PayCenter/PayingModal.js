import React, {Component} from 'react';
import ReactModal from 'react-modal';

export default class PayingModal extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        let {isOpen, onRequestClose, order_id} = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ariaHideApp={false}
                className="modal paying-modal"
                overlayClassName="modal-overlay"
                bodyOpenClassName="body-modal-open"
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
            >
                <div className="modal-header">
                    <span className="modal-title">正在支付...</span>
                    <i className="modal-close material-icons" onClick={onRequestClose}>&#xE5CD;</i>
                </div>
                <div className="modal-body">
                    <div className="waiting">
                        <img src={require('../../asset/image/pic_waiting.png')} alt="" />
                    </div>
                    <div className="tips">
                        <div className="tip">
                            <div className="success-tip-title">支付成功</div>
                            <a href={`/pay/status?cid=${order_id}`}>立即查看订单详情></a>
                        </div>
                        <div className="tip">
                            <div className="failed-tip-title">支付失败</div>
                            <a href="javascript:;">请联系微信 BSTCINE01</a>
                        </div>
                    </div>
                </div>
            </ReactModal>
        );
    }
}
