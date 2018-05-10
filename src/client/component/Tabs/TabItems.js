import React, { Component } from 'react';

export default class TabItems extends Component {
    static defaultProps = {
        className: 'tab-items',
    };

    render() {
        const { children, className } = this.props;
        return (
            <div className={className} role="tab-items">
                {children}
            </div>
        );
    }
}
