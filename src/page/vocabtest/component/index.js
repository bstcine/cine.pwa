import React from 'react';
import * as Service from '../service/index'
import store from 'store';
import * as util from 'common/util'

export default class Index extends React.Component {

    constructor(props) {
        super(props)
        console.log('Index constructor')
        let token = util.getUrlParam('token');
        console.log(`Index constructor token==>${token}`)
        if (token) {
            util.setToken(token)
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
            if (user && user.area_code && user.grade && user.born_at) {
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







