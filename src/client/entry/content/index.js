import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Course from './component/Course'
import Home from './component/Home'
import {getParam} from '@/util/urlUtil'
import storeUtil from '@/util/storeUtil'

import './asset/style/index.less'
import siteCodeUtil from "@/util/sitecodeUtil";
import appBanner from "@/util/appBanner";
import 'material-icons'
import Header from "@/component/Header";
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

class Content extends React.Component {

    constructor(props) {
        super(props);
        console.log('Content Main constructor');

        let urlParam = getParam();
        let token = urlParam.token;
        let sitecode = urlParam.sitecode;
        storeUtil.set('sitecode', sitecode);
        // app 内以 url 上的 token 为准，不传则直接视为登出，清除缓存 token
        siteCodeUtil.inAPP() && storeUtil.removeToken();
        token && storeUtil.set('token', token);
        sitecode && storeUtil.set('sitecode', sitecode)
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }

    handleLoad() {
        appBanner.init()
    }

    render() {
        return (
            <div className="root-container">
                <Header/>
                <Router basename="/content">
                    <div className="content-container">
                        <Route exact path="/" component={Home}/>
                        <Route path="/course" component={Course}/>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<Content/>, document.getElementById('root'));