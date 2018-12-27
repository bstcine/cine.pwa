import React, { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

export default class Router extends Component {
    render() {
        let { children } = this.props;
        return MODE === 'static' ? (
            <HashRouter>{children}</HashRouter>
        ) : (
            <BrowserRouter>{children}</BrowserRouter>
        );
    }
}
