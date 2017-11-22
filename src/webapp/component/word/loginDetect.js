import React from 'react';

export default class LoginDetect extends React.Component {

    constructor(props) {
        super(props)
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
        let url = encodeURIComponent(location.href);
        // let host = 'local.bstcine.com:9000'
        let host = location.host
        location.href = location.protocol + '//' + host + '/login?go=' + url
    }

    startClick() {
        this.props.history.push('/userinfo')
    }

    render() {
        return (
            <div className="wrapper mini">
                <div className="login_detect">
                    <div className="title">系统检测到你<span className="orange">没有登录</span>，为了记录你的学习成长过程，强烈建议你<span className="blue">登录</span>系统后再进行测试</div>
                    <div className="bg_welcome"></div>
                    <button className="button button_orange margin_bottom_72" onClick={this.goLoginClick}>登录系统</button>
                    <button className="button button_blue" onClick={this.startClick}>先测一下看看</button>
                </div>
                <div className="footer mini"></div>
            </div>
        )
    }
}
