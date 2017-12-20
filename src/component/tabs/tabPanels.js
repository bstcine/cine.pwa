import React, {Component} from 'react';

export default class TabPanels extends Component {


    render() {
        const {children} = this.props
        return (
            <div className="tab-panels" role="tab-panels">
                {children}
            </div>
        );
    }
}
