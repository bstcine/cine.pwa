import React from 'react';
import { Route } from 'react-router-dom';
import Router from '../Router';
import CommonUtil from '@/util/_base/commonUtil';

const routes = routes =>
    routes.map((route, i) => {
        if (route.isExact) {
            return (
                <Route
                    key={i}
                    exact
                    path={route.path}
                    render={props => <route.component {...props} />}
                />
            );
        } else {
            return (
                <Route
                    key={i}
                    path={route.path}
                    render={props => <route.component {...props} />}
                />
            );
        }
    });

export const CRouter = ({ route }) => (
    <Router>
        <Route
            path={route.path}
            render={props => {
                if (route.checkAuth && !CommonUtil.isAuth()) return <div />;
                return (
                    <route.component {...props} routes={routes(route.routes)} />
                );
            }}
        />
    </Router>
);
