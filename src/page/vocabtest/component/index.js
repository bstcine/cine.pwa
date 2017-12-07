import React from 'react';
import * as Service from '../service/index'
import * as storeUtil from 'common/util/storeUtil'

export default class Index extends React.Component {

    constructor(props) {
        super(props)
        console.log('Index constructor')
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
                storeUtil.set('user', user)
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







