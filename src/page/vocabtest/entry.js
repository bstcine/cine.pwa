import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
} from 'react-router-dom'
import LoginDetect from './component/loginDetect';
import Index from './component/index';
import Welcome from './component/welcome';
import UserInfo from './component/userInfo';
import Card from './component/card';
import Report from './component/report';
import * as util from 'common/util'
import './asset/style/word.less'

class Word extends React.Component {

    constructor(props) {
        super(props);
        console.log('Word Main constructor')
        let token = util.getUrlParam('token');
        console.log(`Word Main constructor token ==> ${token}`)
        if (token) {
            util.setToken(token)
        }else{
            util.removeToken()
        }
    }

    render() {
        return (
            <Router>
                <div className="word-main">
                    <div className="map-bg"></div>
                    <Route exact path="/" component={Index}/>
                    <Route path="/welcome" component={Welcome}/>
                    <Route path="/logindetect" component={LoginDetect}/>
                    <Route path="/userinfo" component={UserInfo}/>
                    <Route path="/card" component={Card}/>
                    <Route path="/report" component={Report}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Word/>, document.getElementById('root'))