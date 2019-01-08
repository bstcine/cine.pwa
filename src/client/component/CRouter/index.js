import React from 'react';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';

const RRDRouter = ({ children }) => {
    return window.MODE === 'static' ? (
        <HashRouter>{children}</HashRouter>
    ) : (
        <BrowserRouter>{children}</BrowserRouter>
    );
};

const Routes = ({ routes, render }) => {
    return routes.map(item => (
        <Route
            exact={!!item.exact}
            key={item.path}
            path={item.path}
            render={props => {
                if (render) {
                    return render(props, item);
                } else {
                    const Comp = item.component;
                    return <Comp {...props} />;
                }
            }}
        />
    ));
};

const CRouter = ({ routes, render }) => {
    return (
        <RRDRouter>
            <React.Fragment>
                <Routes routes={routes} render={render} />
            </React.Fragment>
        </RRDRouter>
    );
};

export default CRouter;
