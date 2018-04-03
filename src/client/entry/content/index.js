import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router-dom';
import './asset/style/index.less';
import appBanner from '@/util/appBanner';
import Footer from '@/component/Footer';
import Router from '@/component/Router';
import EntryComponent from '@/component/EntryComponent';
import {chunkComponent} from "@/util/chunkComponent";

// const Home = chunkComponent(() => import(/* webpackChunkName: "content/chunk/index.h" */ "./component/Home"))
import Home from  "./component/Home"
// const Course = chunkComponent(() => import(/* webpackChunkName: "content/chunk/index.cc" */ "./component/Course"))
import Course from  "./component/Course"
const PayPrepare = chunkComponent(() => import(/* webpackChunkName: "content/chunk/index.pp" */ "./component/PayPrepare"))
const PayCenter = chunkComponent(() => import(/* webpackChunkName: "content/chunk/index.pc" */ "./component/PayCenter"))
const PayStatus = chunkComponent(() => import(/* webpackChunkName: "content/chunk/index.ps" */ "./component/PayStatus"))


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
                        <Route path="/pay/prepare" component={PayPrepare}/>
                        <Route path="/pay/center" component={PayCenter}/>
                        <Route path="/pay/status" component={PayStatus}/>
                    </React.Fragment>
                </Router>
                <Footer />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
