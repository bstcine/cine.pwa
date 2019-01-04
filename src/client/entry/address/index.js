import React from 'react';
import ReactDOM from 'react-dom';
import { getParam } from '@/util/_base/urlUtil';

import Entry from '@/component/Entry';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './asset/style/index.less';
import { GRouter } from '@/g/component';
import routes from './routes';

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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="address-main">
                    <GRouter routes={routes} />;
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<Address />, document.getElementById('root'));
