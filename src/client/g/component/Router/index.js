import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import storeUtil from '@/util/_base/storeUtil';

const RRDRouter = ({ children }) => {
    return window.MODE === 'static' ? (
        <HashRouter>{children}</HashRouter>
    ) : (
        <BrowserRouter>{children}</BrowserRouter>
    );
};

const Routes = ({ routes }) => {
    return routes.map(item => (
        <Route
            exact={!!item.exact}
            key={item.path}
            path={item.path}
            render={props => {
                if (item.checkAuth && !storeUtil.getToken()) {
                    location.replace(
                        '/auth/signin?redirect=' +
                            encodeURIComponent(location.href)
                    );
                    return <div key={item.path} />;
                } else {
                    const Comp = item.component;
                    return <Comp {...props} />;
                }
            }}
        />
    ));
};

const Router = ({ routes }) => {
    return (
        <RRDRouter>
            <React.Fragment>
                <Routes routes={routes} />
            </React.Fragment>
        </RRDRouter>
    );
};

export default Router;