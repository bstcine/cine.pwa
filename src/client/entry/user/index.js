import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import storeUtil from '@/util/storeUtil';
import Root from '@/entry/user/containers/Root';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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

render(
    <Router>
        <Provider store={store}>
            <Route
                path="/user"
                component={props =>
                    createComponent(Topics, /* userRequired */ true, props)
                }
            />
        </Provider>
    </Router>,
    document.getElementById('root')
);
