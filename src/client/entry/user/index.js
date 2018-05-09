import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { BrowserRouter as Router } from 'react-router-dom';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RouteWithSubRoutes from './userRouter';

const store = createStore(reducer, applyMiddleware(thunk));

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: grey400,
    },
});

render(
    <Router>
        <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <RouteWithSubRoutes/>
            </MuiThemeProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
