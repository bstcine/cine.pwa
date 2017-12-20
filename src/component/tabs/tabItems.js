import React, {Component} from 'react';

export default class TabItems extends Component {


    render() {
        const {children} = this.props
        return (
            <div className="tab-items" role="tab-items">
                {children}
            </div>
        );
    }
}
