import React, {Component} from 'react';
import './header.less';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';

export default class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.needRender = !siteCodeUtil.inAPP() && !uaUtil.wechat();
    }

    async componentDidMount() {}

    render() {
        if (!this.needRender) return null;
        return (
            <div className="footer-container">
                <div className="about-cine">
                    <div className="title">
                        <a href="/about">关于善恩</a>
                    </div>
                    <ul className="about-list">
                        <li>
                            <a href="/">视频课程</a>
                        </li>
                        <li>
                            <a href="/cooperation">合作与招商</a>
                        </li>
                        <li>
                            <a href="/news-17">资讯</a>
                        </li>
                    </ul>
                </div>

                <div className="qrcode">
                    <div className="qrcode-img">
                        <img src="/web/img/qrcode_bstcine.jpg" alt="" />
                    </div>
                    <div className="qrcode-title">微信公众号</div>
                    <div className="qrcode-name">善恩英文名著精读</div>
                </div>
                <div className="qrcode">
                    <div className="qrcode-img">
                        <img src="/web/img/qrcode_bst01.jpg" alt="" />
                    </div>
                    <div className="qrcode-title">客服咨询</div>
                    <div className="qrcode-name">善恩小助手</div>
                </div>
                <div className="qrcode">
                    <div className="qrcode-img">
                        <img src="/web/img/qrcode_Larry.jpg" alt="" />
                    </div>
                    <div className="qrcode-title">课程咨询</div>
                    <div className="qrcode-name">周老师</div>
                </div>
                <div className="qrcode">
                    <div className="qrcode-img">
                        <img src="/web/img/qrcode_Nancy.jpg" alt="" />
                    </div>
                    <div className="qrcode-title">课程咨询</div>
                    <div className="qrcode-name">邱老师Nancy</div>
                </div>
            </div>
        );
    }
}
