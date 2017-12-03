import React from 'react';
import * as util from 'common/util'

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
        console.log('componentDidMount')

    }

    goLoginClick() {
        let sitecode = util.getParam().sitecode;
        if(sitecode === 'cine.android'){
            try{
                Android.login()
            }catch (err){
                alert(JSON.stringify(err))
            }
        }else{
            let url = encodeURIComponent('/vocabtest');
            // let host = 'local.bstcine.com:9000'
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
                    <div className="title">系统检测到你<span className="orange">没有登录</span>，为了记录你的学习成长过程，强烈建议你<span className="blue">登录</span>系统后再进行测试</div>
                    <div className="bg-welcome"></div>
                    <button className="btn btn_orange margin-bottom-72" onClick={this.goLoginClick}>登录系统</button>
                    <button className="btn btn_blue" onClick={this.startClick}>先测一下看看</button>
                </div>
                <div className="footer mini"></div>
            </div>
        )
    }
}
