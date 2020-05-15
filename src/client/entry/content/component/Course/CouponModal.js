import React, { Component } from 'react';
import ReactModal from 'react-modal';
import '@/asset/style/modal.less';

export default class CouponModal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {};
    }

    handleCloseModal() {
        this.props.toggleModal();
    }

    render() {
        let { isOpen, username, coupon } = this.props;
        if (!coupon) return null;
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={this.handleCloseModal}
                ariaHideApp={false}
                className="coupon-modal"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <h2 />
                <div className="desc-wrap">
                    <div className="close" onClick={this.handleCloseModal}>
                        <i className="material-icons">&#xE5CD;</i>
                    </div>
                    <div className="tip">
                        优惠券已成功发放至账户<span>{username}</span>
                    </div>
                    <div className="coupon-ticket">
                        <div className="coupon-value">
                            <span className="value">
                                {100 - Number(coupon.value) * 100}
                            </span>
                            <span className="unit">折</span>
                        </div>
                        <div className="coupon-desc">
                            <div className="coupon-name">{coupon.name}</div>
                            <div className="coupon-no">
                                优惠券码：{coupon.no}
                            </div>
                        </div>
                        <div className="effective-date">
                            有效期：
                            {coupon.effective_at
                                .substring(0, 10)
                                .replace(/-/g, '.')}{' '}
                            -{' '}
                            {coupon.expire_at
                                .substring(0, 10)
                                .replace(/-/g, '.')}
                        </div>
                    </div>
                    <div className="visit-at">
                        去官网 (www.bstcine.com) 或
                        下载"善恩英语APP"了解更多善恩课程
                    </div>
                </div>
            </ReactModal>
        );
    }
}
