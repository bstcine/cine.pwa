import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Root from '@/entry/user/containers/Root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CouponContainer from '@/entry/user/containers/CouponContainer';
import PointContainer from '@/entry/user/containers/PointContainer';
import CommonUtil  from '@/util/common';

const store = createStore(reducer, applyMiddleware(thunk));

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: grey400,
    },
});

const userRoute = {
    path: '/user',
    component: Root,
    routes: [
        {
            path: '/user/coupon',
            component: CouponContainer,
        },
        {
            path: '/user/integral',
            component: PointContainer,
        },
    ],
};

const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => {
            if (!CommonUtil.isAuth()) return <div/>;
            return <route.component {...props} routes={route.routes} />;
        }}
    />
);

render(
    <Router>
        <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <RouteWithSubRoutes {...userRoute} />
            </MuiThemeProvider>
        </Provider>
    </Router>,
    document.getElementById('root')
);
