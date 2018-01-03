import React, {Component} from 'react';
import ReactModal from 'react-modal'
import '@/asset/style/loginModal.less'
import * as Service from '@/service/base'
import errorMsg from '@/util/errorMsg'

export default class CouponModal extends Component {
    constructor(props) {
        super(props);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {

        }
    }

    handleCloseModal() {
        this.props.toggleModal()
    }

    render() {
        return (
            <ReactModal isOpen={this.props.isOpen}
                        onRequestClose={this.handleCloseModal}
                        ariaHideApp={false}
                        className="login-modal"
                        overlayClassName="modal-overlay"
                        shouldCloseOnOverlayClick={true}
                        shouldCloseOnEsc={true}
                        closeTimeoutMS={300}>
                优惠券框

            </ReactModal>
        );
    }
}

