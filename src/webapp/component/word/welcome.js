import React from 'react';
import Link from 'react-router-dom'
import Button from 'material-ui/Button'
import {CircularProgress, LinearProgress} from 'material-ui/Progress'
import * as Service from '../../service/word'
import * as util from '../../util'

let count = 0

export default class Welcome extends React.Component {

    constructor(props) {
        super(props)
        this.startClick = this.startClick.bind(this)
    }

    startClick() {
        let user = this.props.user;
        if (user.area && user.grade && user.born_at) {
            this.props.history.push('/card')
        } else {
            this.props.history.push({
                pathname: '/userinfo',
            })
        }
    }

    componentWillMount() {
        console.log('componentWillMount')
        let query = {};
        if(this.props.token) query.token = this.props.token
        Service.getContentWordConfig(query).then(result => {
            console.log(result)
            if (result.except_case_desc != "no_login") {
                console.log(`result.result.user ${result.result.user}`)
                this.setState({
                    logined: true,
                    user: result.result.user
                })
            }
        })
    }

    componentDidMount() {
        console.log('componentDidMount')

    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true;
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

    }


    render() {
        return (
            <div>
                <div>测一下，看看你的词汇量有多少？</div>
                <div>本测试大约需要3-15分钟不等，具体测试时间跟词汇量和答题速度有关</div>
                <button onClick={this.startClick}>开始词汇量测试</button>
            </div>
        )
    }
}




