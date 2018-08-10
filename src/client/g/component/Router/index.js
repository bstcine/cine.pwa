import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import storeUtil from '@/util/storeUtil';

const Routes = ({ routes }) => {
    console.log('render');
    return routes.map(item => (
        <Route
            exact={!!item.exact}
            key={item.path}
            path={item.path}
            render={props => {
                if (item.checkAuth && !storeUtil.getToken()) {
                    location.replace(
                        '/login?go=' + encodeURIComponent(location.href)
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
        <BrowserRouter>
            <React.Fragment>
                <Routes routes={routes} />
            </React.Fragment>
        </BrowserRouter>
    );
};

export default Router;
