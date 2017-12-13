import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import Course from './component/course'
import Home from './component/home'

import './asset/style/index.less'

class Content extends React.Component {

    constructor(props) {
        super(props)

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