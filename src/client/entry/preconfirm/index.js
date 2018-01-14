import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './asset/style/index2.less'
import 'material-icons'
import EntryComponent from "@/component/EntryComponent";
import PreConfirm from "./component/PreConfirm"

class Entry extends EntryComponent {

    constructor(props) {
        super(props);
        console.log('Content Main constructor');
    }

    render() {
        return (
            <div className="root-container">
                <Router basename="/preconfirm">
                    <div className="content-container">
                        <Route exact path="/" component={PreConfirm}/>
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<Entry/>, document.getElementById('root'));