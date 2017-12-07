import React from 'react';
import * as storeUtil from 'common/util/storeUtil'
import {initWechat, setShareParam} from 'common/util/wechatUtil'
export default class LoginDetect extends React.Component {

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
        initWechat().then((err)=>{
            if(!err){
                setShareParam({
                    title: "title11111  Card",
                    link: "http://www.bstcine.com/lesson/42",
                    imgUrl: "http://www.bstcine.com/f/2017/08/21/160423502SrRRfn8.jpg",
                    desc: "descdesc"
                })
            }
        })
    }

    goLoginClick() {
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === 'cine.android') {
            try {
                console.log(`ee register 'testcallback'`)
                ee.on('testcallback', (res) => {
                    console.log(`js的一小步，cine的一大步！===> token ====>>>> ${res}`)
                })
                console.log(`call android`)
                Android.login('testcallback')
            } catch (err) {
                alert(JSON.stringify(err))
            }
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
