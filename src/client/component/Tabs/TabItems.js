import React, { Component } from 'react';

export default class TabItems extends Component {
    static defaultProps = {
        className: 'tab-items',
    };

    render() {
        const { children, className, style } = this.props;
        return (
            <div className={className} role="tab-items" style={style}>
                {children}
            </div>
        );
    }
}
