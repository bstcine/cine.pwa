import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Course from './component/Course';
import Prepare from './component/Prepare';
import Home from './component/Home';
import './asset/style/index.less';
import appBanner from '@/util/appBanner';
import 'material-icons';
import Header from '@/component/Header';
import EntryComponent from '@/component/EntryComponent';
import Footer from "@/component/Footer";


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
                <Header />
                <Router basename="/content">
                    <React.Fragment>
                        <Route exact path="/" component={Home} />
                        <Route path="/course" component={Course} />
                        <Route path="/prepare" component={Prepare} />
                    </React.Fragment>
                </Router>
                <Footer/>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('root'));
