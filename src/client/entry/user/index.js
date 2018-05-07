import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import storeUtil from '@/util/storeUtil';
import Root from '@/entry/user/containers/Root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(reducer, applyMiddleware(thunk));

const createComponent = (Component, userRequired, props) => {
    if (userRequired && !storeUtil.getToken()) {
        location.href = '/login?go=' + encodeURIComponent(location.href);
        return;
    }
    return <Component {...props} />;
};

const Topics = ({ match }) => (
    <React.Fragment>
        <Route exact path={match.url} component={Root} />
        <Route path={`${match.url}/:topicId`} component={Root} />
    </React.Fragment>
);

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
                <Route
                    path="/user"
                    component={props =>
                        createComponent(Topics, /* userRequired */ true, props)
                    }
                />
            </MuiThemeProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
