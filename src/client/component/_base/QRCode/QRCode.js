import React, { Component } from 'react';
import { componentNames } from '@/component/_base/config';
import Mask from '@/component/_base/Mask';
import Icon from '@/component/_base/Icon';
const cls = componentNames.QRCode;

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
                        }}>
                        close
                    </Icon>
                    <div className={`${cls}__content`}>
                        <img src={url} alt="qrcode" className={`${cls}__img`} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default QRCode;
