import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import LoginDetect from './component/loginDetect';
import Index from './component/index';
import Welcome from './component/welcome';
import UserInfo from './component/userInfo';
import Card from './component/card';
import Report from './component/report';
import ReportList from './component/reportList';
import {getParam, getPureUrl} from 'common/util/urlUtil'
import * as storeUtil from 'common/util/storeUtil'

import './asset/style/index.less'
import Bridge from "../../common/util/bridge";

class Word extends React.Component {

    constructor(props) {
        super(props)
        console.log('Word Main constructor')
        let urlParam = getParam()
        console.log(`Word constructor urlUtil.getParam ==> ${JSON.stringify(urlParam)}`)
        let token = urlParam.token
        let sitecode = urlParam.sitecode
        storeUtil.remove('user')
        storeUtil.remove('token')
        storeUtil.remove('sitecode')
        token && storeUtil.set('token', token)
        sitecode && storeUtil.set('sitecode', sitecode)
    }

    componentDidMount() {
        Bridge.ios('timeline', {type: 'loaded'}, true)
    }

    render() {
        return (
            <Router basename="/vocabtest">
                <div className="word-main">
                    <div className="map-bg"></div>
                    <Route exact path="/" component={Index}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/logindetect" component={LoginDetect}/>
                    <Route path="/userinfo" component={UserInfo}/>
                    <Route path="/card" component={Card}/>
                    <Route path="/report" component={Report}/>
                    <Route path="/reportlist" component={ReportList}/>
                </div>
            </Router>

        )
    }
}

ReactDOM.render(<Word/>, document.getElementById('root'))