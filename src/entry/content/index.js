import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Course from './component/course'
import Home from './component/home'
import {getParam} from '@/util/urlUtil'
import * as storeUtil from '@/util/storeUtil'

import './asset/style/index.less'

class Content extends React.Component {

    constructor(props) {
        super(props)
        console.log('Content Main constructor')
        // alert(`location ${location.href}`)
        let urlParam = getParam()
        // alert(`Content constructor urlUtil.getParam ==> ${JSON.stringify(urlParam)}`)
        let token = urlParam.token
        let sitecode = urlParam.sitecode
        storeUtil.remove('user')
        storeUtil.remove('token')
        storeUtil.remove('sitecode')
        token && storeUtil.set('token', token)
        sitecode && storeUtil.set('sitecode', sitecode)
    }

    componentDidMount() {

    }

    render() {
        return (
            <Router basename="/content">
                <div className="container">
                    <Route exact path="/" component={Home}/>
                    <Route path="/course" component={Course}/>
                </div>
            </Router>

        )
    }
}

ReactDOM.render(<Content/>, document.getElementById('root'))