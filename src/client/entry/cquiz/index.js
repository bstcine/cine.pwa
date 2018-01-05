import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Index from './component/index.js';
import Card from './component/card.js';

import './asset/style/index.less'
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'

class Quiz extends React.Component {

    constructor(props) {
        super(props)
        console.log('constructor');

        let urlParam = getParam();
        console.log(`getParam ==> ${JSON.stringify(urlParam)}`);
        let token = urlParam.token;
        let sitecode = urlParam.sitecode;
        storeUtil.remove('token');
        storeUtil.remove('sitecode');
        token && storeUtil.set('token', token);
        sitecode && storeUtil.set('sitecode', sitecode);

        let quiz_id = urlParam.id;
        let quiz_type = urlParam.type;
        let quiz_title = urlParam.title;
        storeUtil.set('quiz_id', quiz_id);
        storeUtil.set('quiz_isOver', (quiz_type && quiz_type == '-1'));//是否本章测试
        storeUtil.set('quiz_title', quiz_title);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Router basename="/cquiz">
                <div>
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/card" component={Card}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<Quiz/>, document.getElementById('root'))