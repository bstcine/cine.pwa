import React, {Component} from 'react';
import storeUtil from '@/util/storeUtil'
import {initWechat} from '@/util/wechatUtil'
import Bridge from '@/util/bridge'
import SITECODE from '@/constant/sitecode'
import BRIDGE_EVENT from "@/constant/bridgeEvent";

export default class LoginDetect extends Component {

    constructor(props) {
        super(props)
        console.log('LoginDetect constructor')
        this.goLoginClick = this.goLoginClick.bind(this)
        this.startClick = this.startClick.bind(this)
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        initWechat()
    }

    goLoginClick() {
        let sitecode = storeUtil.get('sitecode');
        // alert(`sitecode ${sitecode}`)
        if (sitecode === SITECODE.ANDROID_PHONE || sitecode === SITECODE.ANDROID_PAD || sitecode === SITECODE.ANDROID) {
            Bridge.android(BRIDGE_EVENT.LOGIN).then(res => {
                this.props.history.push(`/?token=${res.token}`)
            })
        } else if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.LOGIN).then(res => {
                this.props.history.push(`/?token=${res.token}`)
            })
        } else {
            let url = encodeURIComponent('/vocabtest');
            let host = location.host
            location.href = location.protocol + '//' + host + '/login?go=' + url
        }
    }

    startClick() {
        this.props.history.push('/userinfo')
    }

    render() {
        return (
            <div className="wrapper mini">
                <div className="login-detect">
                    <div className="title">系统检测到你<span className="orange">没有登录</span>，为了记录你的学习成长过程，强烈建议你<span
                        className="blue">登录</span>系统后再进行测试
                    </div>
                    <div className="bg-welcome"></div>
                    <button className="btn btn_orange margin-bottom-72" onClick={this.goLoginClick}>登录系统</button>
                    <button className="btn btn_blue" onClick={this.startClick}>先测一下看看</button>
                </div>
                <div className="footer mini"></div>
            </div>
        )
    }
}
