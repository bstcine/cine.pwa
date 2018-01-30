import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './asset/style/index2.less'
import 'material-icons'
import Header from "@/component/Header";
import EntryComponent from "@/component/EntryComponent";
import PreConfirm from "./component/PreConfirm"

class Entry extends EntryComponent {

    constructor(props) {
        super(props);
        console.log('Content Main constructor');
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Router basename="/preconfirm">
                    <React.Fragment>
                        <Route exact path="/" component={PreConfirm}/>
                    </React.Fragment>
                </Router>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<Entry/>, document.getElementById('root'));