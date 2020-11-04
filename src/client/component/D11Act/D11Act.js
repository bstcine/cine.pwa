import React, { Component } from 'react';
import Icon from '@/component/_base/Icon';
import qrcode from 'qrcode';
const cls = `cine-qrcode`;

class D11Act extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img_url: null,
        };
    }

    componentDidMount() {
        const { url } = this.props;
        qrcode
            .toDataURL(url, { width: 200 })
            .then(img_url => {
                this.setState({ img_url });
            })
            .catch(err => {
                alert(err);
            });
    }

    render() {
        const { close } = this.props;
        const { img_url } = this.state;
        return (
            <div className={cls}>
                <Icon
                    className={`${cls}__close`}
                    onClick={() => {
                        close();
                    }}
                >
                    close
                </Icon>
                <div className={`${cls}__content`}>
                    <div className={`${cls}__title`}>打开微信“扫一扫”</div>
                    <div className={`${cls}__img`}>
                        <img src={img_url} alt="qrcode" />
                    </div>
                </div>
            </div>
        );
    }
}

export default D11Act;
