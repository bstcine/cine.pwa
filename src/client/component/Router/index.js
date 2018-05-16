import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

export default class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { basename, children } = this.props;
        return (
            <React.Fragment>
                {process.env.MODE === 'static' ? (
                    <HashRouter>{children}</HashRouter>
                ) : (
                    <BrowserRouter basename={basename}>
                        {children}
                    </BrowserRouter>
                )}
            </React.Fragment>
        );
    }
}
