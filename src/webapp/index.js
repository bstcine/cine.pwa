import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, browserHistory} from 'react-router-dom'


class Index extends React.Component {
    render() {

        return (
            <div className="card-panel teal lighten-2">
                Hello, Im joe
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("main"));