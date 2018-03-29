/**
 * Created by joe on 3/29/18.
 */
import React from 'react';

export const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({Component});
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const {Component} = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);

export const chunkComponent = (filename, path) => {
    "use strict";
    const _loadComponent = () => import(/* webpackChunkName: "content/chunk/index.h" */ {path})
    return asyncComponent(_loadComponent)
}
