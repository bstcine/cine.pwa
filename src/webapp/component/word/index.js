import React from 'react';
import Link from 'react-router-dom'
import Button from 'material-ui/Button'
import {CircularProgress, LinearProgress} from 'material-ui/Progress'
import * as Service from '../../service/word'
import * as util from '../../util'
import Welcome from './welcome'
import LoginDetect from './LoginDetect'

export default class Index extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log('componentWillMount')
        Service.getContentWordConfig({}).then(result => {
            console.log(result)
            if (result.except_case_desc === "no_login") {
                return this.props.history.push('/logindetect')
            }
            if (result.except_case_desc && result.except_case_desc !== "no_login") {
                return alert(result.except_case_desc)
            }
            let user = result.result.user
            if (user && user.area && user.grade && user.born_at) {
                store.set('user',user)
                this.props.history.push(`/welcome`)
            } else {
                this.props.history.push(`/userinfo`)
            }
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    render(){
        return (
            <div></div>
        )
    }

}







