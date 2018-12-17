import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getParam } from '@/util/_base/urlUtil';

import Entry from '@/component/Entry';
import Index from './component/Index';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './asset/style/index.less';

class Address extends Entry {
    constructor(props) {
        super(props);
        console.log('constructor');

        let urlParam = getParam();
        console.log(`Address getParam ==> ${JSON.stringify(urlParam)}`);
    }

    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: indigo500,
                primary2Color: indigo700,
                primary3Color: grey400,
            },
        });

        return (
            <Router basename="/address">
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="address-main">
                        <Route exact path="/" component={Index} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

ReactDOM.render(<Address />, document.getElementById('root'));
