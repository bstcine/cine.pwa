import React, { Component } from 'react';

export default class TabPanels extends Component {
    static defaultProps = {
        className: 'tab-panels',
    };

    render() {
        const { children, className } = this.props;
        return (
            <div className={className} role="tab-panels">
                {children}
            </div>
        );
    }
}
