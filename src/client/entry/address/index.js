import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Index from './component/Index';

import './asset/style/index.less'
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'

class Quiz extends React.Component {

    constructor(props) {
        super(props)
        console.log('constructor');

        let urlParam = getParam();
        console.log(`Quiz getParam ==> ${JSON.stringify(urlParam)}`);
        let token = urlParam.token;
        let sitecode = urlParam.sitecode;
        storeUtil.remove('user');
        storeUtil.remove('token');
        storeUtil.remove('sitecode');
        token && storeUtil.set('token', token);
        sitecode && storeUtil.set('sitecode', sitecode);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router basename="/address">
                <div className="address-main">
                    <Route exact path="/" component={Index}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Quiz/>, document.getElementById('root'))