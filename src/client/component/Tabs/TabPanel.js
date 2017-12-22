import React, {Component} from 'react';

export default class TabPanel extends Component {

    static defaultProps = {
        className: 'tab-panel'
    }

    render() {
        const {children, className, selected} = this.props
        return (
            <div className={`${className}${selected ? ' active' : ''}`} role="tab-panel">
                {children}
            </div>
        );
    }
}
