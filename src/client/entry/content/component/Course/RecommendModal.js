import React, {Component} from 'react';
import ReactModal from 'react-modal'
import '@/asset/style/modal.less'
import * as Service from '@/service/base'
import errorMsg from '@/util/errorMsg'

export default class RecommendModal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.beforeShare = this.beforeShare.bind(this);

        this.state = {}
    }

    handleCloseModal() {
        this.props.toggleModal()
    }

    beforeShare() {
        this.props.toggleModal()
        this.props.clickShare()
    }

    render() {
        return (
            <ReactModal isOpen={this.props.isOpen}
                        onRequestClose={this.handleCloseModal}
                        ariaHideApp={false}
                        className="recommend-modal"
                        overlayClassName="modal-overlay"
                        shouldCloseOnOverlayClick={true}
                        shouldCloseOnEsc={true}>
                <div className="close" onClick={this.handleCloseModal}>
                    <i className="material-icons">close</i>
                </div>

                <div className="h2">推荐课程得积分</div>
                <div className="desc">
                    快将善恩的课程通过微信朋友圈推荐给好友！好友可获得：<br/>
                    <span>新人95折优惠券</span><br/>
                    好友下单后，您还可以获得：<br/>
                    <span>10%</span>的积分奖励<br/>
                    传播知识，让优惠翻倍！
                </div>
                <button className="btn" onClick={this.beforeShare}>立即分享</button>

            </ReactModal>
        );
    }
}

