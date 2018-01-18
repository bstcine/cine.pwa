import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginDetect from './component/LoginDetect';
import Index from './component/Index';
import Welcome from './component/Welcome';
import UserInfo from './component/UserInfo';
import Card from './component/Card';
import Report from './component/Report';
import ReportList from './component/ReportList';
import storeUtil from '@/util/storeUtil';
import './asset/style/index.less';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';
import 'material-icons';
import EntryComponent from '@/component/EntryComponent';

class Word extends EntryComponent {
    constructor(props) {
        super(props);
        console.log('Word Main constructor');
        storeUtil.remove('user');
    }

    componentDidMount() {
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, {type: 'loaded'});
        }
    }

    render() {
        return (
            <Router basename="/vocabtest">
                <div className="word-main">
                    <div className="map-bg" />
                    <Route exact path="/" component={Index} />
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/logindetect" component={LoginDetect} />
                    <Route path="/userinfo" component={UserInfo} />
                    <Route path="/card" component={Card} />
                    <Route path="/report" component={Report} />
                    <Route path="/reportlist" component={ReportList} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Word />, document.getElementById('root'));
