import React,{Component} from 'react';
import * as Service from '@/service/vocabtest'
import storeUtil from '@/util/storeUtil'
import {getParam} from '@/util/urlUtil'

export default class Index extends Component {

    constructor(props) {
        super(props)
        console.log('Index constructor')
        let urlParam = getParam()
        console.log(`Index constructor urlUtil.getParam ==> ${JSON.stringify(urlParam)}`)
        let token = urlParam.token
        let sitecode = urlParam.sitecode
        if (token) {
            storeUtil.remove('token')
            storeUtil.set('token', token)
        }
        if (sitecode) {
            storeUtil.remove('sitecode')
            storeUtil.set('sitecode', sitecode)
        }
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
            storeUtil.set('user', user)
            if (user.area_code && user.grade && user.born_at) {
                this.props.history.push(`/welcome`)
            } else {
                this.props.history.push(`/userinfo`)
            }
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
    }


    render() {
        return (
            <div></div>
        )
    }

}







