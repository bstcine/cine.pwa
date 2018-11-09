import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { CButton, CModal } from '@/component/_base';
import uaUtil from '@/util/uaUtil';

class CLoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wxHref: '',
        };
    }

    static onClickWechatLogin() {
        if (uaUtil.wechat()) {
            location.href =
                '//www.bstcine.com/wechat/auth?redirect=' +
                encodeURIComponent(location.href);
        } else {
            let url = `http://${
                location.host
            }/wechat/authcallback?redirect=${encodeURIComponent(
                encodeURIComponent(location.href)
            )}&silent=0`;
            new window.WxLogin({
                self_redirect: true,
                id: 'wxQrcode',
                appid: 'wx795e91473044e6fd',
                scope: 'snsapi_login',
                redirect_uri: url,
            });
        }
    }

    render() {
        return (
            <CModal {...this.props}>
                <CButton onClick={CLoginModal.onClickWechatLogin}>
                    微信登录
                </CButton>
                <div id="wxQrcode" />
            </CModal>
        );
    }
}

CLoginModal.open = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { ...props, close, isOpen: true };

    function render(currentProps) {
        ReactDOM.render(<CLoginModal {...currentProps} />, div);
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

export default CLoginModal;
