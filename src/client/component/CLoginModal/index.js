import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginModal from '@/component/LoginModal';

class CLoginModal extends Component {
    static onClickWechatLogin() {
        location.href =
            '//www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(location.href) +
            '&scope=snsapi_userinfo';
    }

    static getWxHref() {
        let url =
            'http://www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(location.href) +
            '&scope=snsapi_login';
        return url;
    }

    constructor(props) {
        super(props);
        this.state = {
            wxHref: '',
        };
    }

    render() {
        const { isOpen, onSuccess } = this.props;
        return <LoginModal isOpen={isOpen} onSuccess={onSuccess} />;
    }
}

CLoginModal.open = function(onSuccess) {
    function render(currentProps) {
        ReactDOM.render(<CLoginModal {...currentProps} />, div);
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { onSuccess, close, isOpen: true };

    render(currentProps);
    return {
        close,
    };
};

export default CLoginModal;
