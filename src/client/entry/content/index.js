import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Course from './component/Course'
import Home from './component/Home'
import './asset/style/index.less'
import appBanner from "@/util/appBanner";
import 'material-icons'
import Header from "@/component/Header";
import EntryComponent from "@/component/EntryComponent";
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

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