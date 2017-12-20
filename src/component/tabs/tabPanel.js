import React, {Component} from 'react';

export default class TabPanel extends Component {


    render() {
        const {children, selected} = this.props
        return (
            <div className={`tab-panel${selected ? ' active' : ''}`} role="tab-panel">
                {children}
            </div>
        );
    }
}
