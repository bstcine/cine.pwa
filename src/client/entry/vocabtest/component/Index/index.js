import React,{Component} from 'react';
import * as Service from '@/service/vocabtest'
import storeUtil from '@/util/storeUtil'

export default class Index extends Component {

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
            storeUtil.set('user', user)
            if (user.area_code && user.grade && user.born_at) {
                this.props.history.replace(`/welcome`)
            } else {
                this.props.history.replace(`/userinfo`)
            }
        })
    }

    componentDidMount() {
        console.log('componentDidMount')
    }


    render() {
        return (
            <div/>
        )
    }

}







