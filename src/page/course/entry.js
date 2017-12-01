import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import LoginDetect from './component/loginDetect';
import * as Service from './service/index'
import * as util from 'common/util'
import './asset/style/index.less'

class Course extends React.Component {

    constructor(props) {
        super(props);
        let token = util.getUrlParam('token');
        if (token) {
            util.setToken(token)
        }else{
            util.removeToken()
        }
    }

    componentWillMount() {
        console.log('componentWillMount')

    }

    componentDidMount() {
        console.log('componentDidMount')
        const cid = util.getParam('cid')
        Service.getContentCourseDetail({cid}).then((res)=>{
            this.setState({
                lesson:res.result.detail
            })
        })
    }



    render() {
        return (
            <div>
                <div className="basic-wrap">
                    <div className="video"></div>
                    <div className="brief">
                        <div className="title"></div>
                        <div className="slogan"></div>
                        <div className="meta"></div>
                    </div>
                </div>
                <div className="detail-wrap">

                </div>
            </div>
        )
    }
}

ReactDOM.render(<Course/>, document.getElementById('root'))