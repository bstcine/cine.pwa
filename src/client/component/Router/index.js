import React, {Component} from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';

export default class Router extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props
        return (
            <React.Fragment>
                {process.env.MODE === 'static' ? (
                    <HashRouter {...props}>{this.props.children}</HashRouter>
                ) : (
                    <BrowserRouter {...props}>{this.props.children}</BrowserRouter>
                )}
            </React.Fragment>
        );
    }
}
