import React, { Component } from 'react';
import Mask from '@/component/_base/Mask';
import Icon from '@/component/_base/Icon';
const cls = `cine-qrcode`;

class QRCode extends Component {
    render() {
        const { close, url } = this.props;
        return (
            <React.Fragment>
                <Mask />
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
                        <p>打开微信“扫一扫”</p>
                        <img src={url} alt="qrcode" className={`${cls}__img`} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default QRCode;
