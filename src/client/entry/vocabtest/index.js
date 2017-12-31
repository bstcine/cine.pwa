import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import LoginDetect from './component/LoginDetect';
import Index from './component/Index';
import Welcome from './component/Welcome';
import UserInfo from './component/UserInfo';
import Card from './component/Card';
import Report from './component/Report';
import ReportList from './component/ReportList';
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'

import './asset/style/index.less'
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";
import BRIDGE_EVENT from '@/constant/bridgeEvent'

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
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.IOS || sitecode === SITECODE.IOS_IPHONE || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, {type: 'loaded'}, true)
        }

    }

    render() {
        return (
            <Router basename="/vocabtest">
                <div className="word-main">
                    <div className="map-bg"/>
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