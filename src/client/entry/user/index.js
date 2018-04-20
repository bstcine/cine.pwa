import React from 'react'
import {render} from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducer from './reducers'
import storeUtil from "@/util/storeUtil";
import Root from "@/entry/user/containers/Root";
import {BrowserRouter as Router, Route} from 'react-router-dom';

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

const createComponent = (Component, userRequired, props) => {
    if (userRequired && !storeUtil.getToken()) {
        location.href = '/login?go=' + encodeURIComponent(location.href);
        return;
    }
    return <Component {...props} />;
};

render(
    <Router>
        <Provider store={store}>
            <Route
                basename="/user"
                component={props => createComponent(Root, /* userRequired */ true, props)}
            />
        </Provider>
    </Router>,
    document.getElementById('root')
)
