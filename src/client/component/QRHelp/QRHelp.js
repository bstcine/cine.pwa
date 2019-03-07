import React, { Component } from 'react';
import Icon from '@/component/_base/Icon';
const cls = `cine-qrhelp`;

class QRHelp extends Component {
    render() {
        const { close, img, h1, h2 } = this.props;
        return (
            <div className={cls}>
                <Icon className={`${cls}__close`} onClick={close}>
                    close
                </Icon>
                <div className={`${cls}__content`}>
                    <div className={`${cls}__title`}>{h1}</div>
                    <div className={`${cls}__wechat`}>{h2}</div>
                    <div className={`${cls}__img`}>
                        <img src={img} alt="qrcode" />
                    </div>
                </div>
            </div>
        );
    }
}

export default QRHelp;
