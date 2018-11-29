import React, { Component } from 'react';
import Mask from '@/component/_base/Mask';
import Icon from '@/component/_base/Icon';
const cls = `cine-qrhelp`;

class QRHelp extends Component {
    render() {
        const { close, img, h1, h2 } = this.props;
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
                        <p>{h1}</p>
                        <div className={`${cls}__wechat`}>{h2}</div>
                        <img src={img} alt="qrcode" className={`${cls}__img`} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default QRHelp;
