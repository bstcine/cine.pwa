import React, { Component } from 'react';
import './footer.less';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isShow } = this.props;
        if (!isShow) return null;
        return (
            <div className="container">
                <div className="footer">
                    <div className="contact">
                        <div className="about-cine">
                            <div className="title">
                                <a href="/about">关于善恩</a>
                            </div>
                            <ul className="about-list">
                                <li>
                                    <a href="/">英语视频</a>
                                </li>
                                <li>
                                    <a href="/cooperation">合作与招商</a>
                                </li>
                                <li>
                                    <a href="/news-17">资讯</a>
                                </li>
                            </ul>
                        </div>

                        <div className="qrcodes">
                            <div className="qrcode">
                                <div className="qrcode-img">
                                    <img
                                        src={require('@/asset/image/qrcode_bstcine.jpg')}
                                        alt="善恩英文名著精读"
                                    />
                                </div>
                                <div className="qrcode-title">微信公众号</div>
                                <div className="qrcode-name">
                                    善恩英语
                                </div>
                            </div>
                            <div className="qrcode">
                                <div className="qrcode-img">
                                    <img
                                        src={require('@/asset/image/qrcode_bst02.jpg')}
                                        alt="善恩小助手"
                                    />
                                </div>
                                <div className="qrcode-title">
                                    客服咨询
                                </div>
                                <div className="qrcode-name">善恩小助手</div>
                            </div>
                            <div className="qrcode">
                                <div className="qrcode-img">
                                    <img
                                        src={require('@/asset/image/qrcode_Larry.jpg')}
                                        alt="周老师"
                                    />
                                </div>
                                <div className="qrcode-title">
                                    美高/美本升学顾问
                                </div>
                                <div className="qrcode-name">周老师</div>
                            </div>
                            <div className="qrcode">
                                <div className="qrcode-img">
                                    <img
                                        src={require('@/asset/image/qrcode_Nancy.jpg')}
                                        alt="Nancy老师"
                                    />
                                </div>
                                <div className="qrcode-title">托福/SAT老师</div>
                                <div className="qrcode-name">Nancy老师</div>
                            </div>
                        </div>
                    </div>

                    <div className="copyright">
                        <div className="co-desc">
                            <div className="co-desc-year">
                                Copyright © 2014 - {new Date().getFullYear()}{' '}
                                <a href="//www.bstcine.com">BSTCINE</a>. All
                                Rights Reserved.{' '}
                            </div>
                            <div className="co-desc-code">
                                <a href="http://www.beian.miit.gov.cn/">
                                    沪ICP备14053596号-1
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
