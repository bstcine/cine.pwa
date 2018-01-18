import React, {Component} from 'react';
import storeUtil from '@/util/storeUtil';
import {initWechat} from '@/util/wechatUtil';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        console.log('Welcome constructor');
        this.startClick = this.startClick.bind(this);
    }

    startClick() {
        let user = storeUtil.get('user');
        if (user && user.area_code && user.grade && user.born_at) {
            this.props.history.push(`/card`);
        } else {
            this.props.history.push('/userinfo');
        }
    }

    componentDidMount() {
        initWechat();
    }

    render() {
        return (
            <div className="wrapper mini">
                <div className="welcome">
                    <div className="start-bg" />
                    <div className="tips">
                        本测试是严谨的学术型词汇量测试，耗时比一般的词汇量测试更长，大约需要5-10分钟。在本测试中，您将得不到任何“对错”的提示。在测试结束后，您将获得详细的词汇量报告
                    </div>
                    <button className="btn btn_blue" onClick={this.startClick}>
                        开始测试
                    </button>
                </div>
            </div>
        );
    }
}
