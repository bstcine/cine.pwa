import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mask from '@/component/_base/Mask';
import Icon from '@/component/_base/Icon';
const cls = `cine-qrhelp`;
import './style.less';

class QRHelp extends Component {
    render() {
        const { close, url } = this.props;
        return (
            <React.Fragment>
                <Mask
                    onClick={() => {
                        close();
                    }}
                />
                <div className={cls}>
                    <Icon
                        className={`${cls}__close`}
                        onClick={() => {
                            console.log('Icon close');
                            close();
                        }}>
                        close
                    </Icon>
                    <div className={`${cls}__content`}>
                        <p>微信“扫一扫”, 联系善恩小助手</p>
                        <div className={`${cls}__wechat`}>(微信号：BSTCINE01)</div>
                        <img src={url} alt="qrcode" className={`${cls}__img`} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

QRHelp.open = function() {
    function render(url, close) {
        console.log('render', close);

        ReactDOM.render(<QRHelp url={url} close={close} />, div);
    }
    function close() {
        console.log('close');
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const help = require('@/asset/image/qrcode_bst01.jpg');
    const div = document.createElement('div');
    document.body.appendChild(div);
    render(help, close);
};

export default QRHelp;
