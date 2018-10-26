import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Mask from '@/component/_base/Mask';
import Icon from '@/component/_base/Icon';
const cls = `cine-qrhelp`;

class QrNancy extends Component {
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
                        }}
                    >
                        close
                    </Icon>
                    <div className={`${cls}__content`}>
                        <p>微信“扫一扫”, 联系Nancy老师</p>
                        <div className={`${cls}__wechat`}>
                            (微信号：WEINANQIU)
                        </div>
                        <img src={url} alt="qrcode" className={`${cls}__img`} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

QrNancy.open = function() {
    function render(url, close) {
        console.log('render', close);

        ReactDOM.render(<QrNancy url={url} close={close} />, div);
    }
    function close() {
        console.log('close');
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    const help = require('@/asset/image/qrcode_Nancy.jpg');
    const div = document.createElement('div');
    document.body.appendChild(div);
    render(help, close);
};

export default QrNancy;
