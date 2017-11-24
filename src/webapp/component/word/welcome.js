import React from 'react';
import store from 'store';


export default class Welcome extends React.Component {

    constructor(props) {
        super(props)
        console.log('Welcome constructor')
        this.startClick = this.startClick.bind(this)
    }

    startClick() {
        let user = store.get('user');
        if (user && user.area_code && user.grade && user.born_at) {
            this.props.history.push(`/card`)
        } else {
            this.props.history.push('/userinfo')
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')

    }

    render() {
        return (
            <div className="wrapper mini">
                <div className="welcome">
                    <div className="title">测一下，看看你的词汇量有多少？</div>
                    <div className="start-bg"></div>
                    <div className="tips">本测试大约需要3-15分钟不等，具体测试时间跟词汇量和答题速度有关</div>
                    <button className="btn btn_blue" onClick={this.startClick}>开始词汇量测试</button>
                </div>
                <div className="footer mini"></div>
            </div>
        )
    }
}




