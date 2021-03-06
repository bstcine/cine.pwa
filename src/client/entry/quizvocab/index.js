import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './component/Welcome';
import UserInfo from './component/UserInfo';
import Card from './component/Card';
import Report from './component/Report';
import ReportList from './component/ReportList';
import './asset/style/index.less';
import Bridge from '@/util/_base/interBridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import Entry from '@/component/Entry';

class Word extends Entry {
    constructor(props) {
        super(props);
        console.log('Word Main constructor');
    }

    componentDidMount() {
        if (interSiteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.TIMELINE, { type: 'loaded' });
        }
    }

    render() {
        return (
            <Router basename="/quizvocab">
                <div className="word-main">
                    <div className="map-bg" />
                    <Route exact path="/" component={Welcome} />
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
