import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import './asset/style/index.less';
import appBanner from '@/util/appBanner';
import Footer from '@/component/Footer';
import Router from '@/component/Router';
import EntryComponent from '@/component/EntryComponent';
import storeUtil from "@/util/storeUtil";
import {asyncComponent} from "@/util/chunkComponent";

const Home = asyncComponent(() => import(/* webpackChunkName: "content/chunk/index.h" */ "./component/Home"))
const Course = asyncComponent(() => import(/* webpackChunkName: "content/chunk/index.cc" */ "./component/Course"))
const PayPrepare = asyncComponent(() => import(/* webpackChunkName: "content/chunk/index.pp" */ "./component/PayPrepare"))
const PayCenter = asyncComponent(() => import(/* webpackChunkName: "content/chunk/index.pc" */ "./component/PayCenter"))
const PayStatus = asyncComponent(() => import(/* webpackChunkName: "content/chunk/index.ps" */ "./component/PayStatus"))

const asyncChunkComponent = (component, userRequired) => {
    if (userRequired && !storeUtil.getToken()) {
        location.href = "/login?go=" + encodeURIComponent(location.href);
        return
    }
    return component
};


class Content extends EntryComponent {
    constructor(props) {
        super(props);
        console.log('Content Main constructor');
        this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }

    handleLoad() {
        appBanner.init();
    }

    render() {

        return (
            <React.Fragment>
                <Router>
                    <React.Fragment>
                        <Route exact path="/" component={Home}/>
                        <Route path="/content/course" component={Course}/>
                        <Route path="/pay/prepare" component={asyncChunkComponent(PayPrepare, true)}/>
                        <Route path="/pay/center" component={asyncChunkComponent(PayCenter, true)}/>
                        <Route path="/pay/status" component={asyncChunkComponent(PayStatus, true)}/>
                    </React.Fragment>
                </Router>
                <Footer />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
