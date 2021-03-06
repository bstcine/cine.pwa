import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';

export default class Notice extends Component {
    static defaultProps = {
        notices: [],
    };

    render() {
        console.log(`GlobalNotice`);
        let { notices } = this.props;
        return (
            <div className="notice-container">
                <div className="notice-text" />
                <ul className="notice-list">
                    {notices.map((item, i) => {
                        return (
                            <li className="notice-item" key={i}>
                                <a href={item.href}>
                                    <span className="notice-tag">
                                        {item.tag}
                                    </span>
                                    <span className="notice-title">
                                        {item.name}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                    {/*<li className="notice-item">*/}
                    {/*    <a*/}
                    {/*        href="#"*/}
                    {/*        onClick={() => {*/}
                    {/*            QRHelp.open();*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <span className="notice-tag">【课程咨询】</span>*/}
                    {/*        <span className="notice-title">*/}
                    {/*            找不到需要的课程？请联系善恩小助手*/}
                    {/*        </span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                </ul>
            </div>
        );
    }
}
