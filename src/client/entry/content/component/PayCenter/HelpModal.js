import React, {Component} from 'react';
import ReactModal from 'react-modal';
import uaUtil from "@/util/uaUtil";

const androidImg = require('../../asset/image/wechat-android.png')
const iosImg = require('../../asset/image/wechat-ios.png')

export default class HelpModal extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let {isOpen, onRequestClose} = this.props;
        return (
            <ReactModal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                ariaHideApp={false}
                className="help-modal"
                overlayClassName="modal-overlay"
                bodyOpenClassName="body-modal-open"
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
            >
                <img src={uaUtil.iOS() ? iosImg : androidImg} />
            </ReactModal>
        );
    }
}
