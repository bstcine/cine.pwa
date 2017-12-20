import React, {Component} from 'react';

export default class TabItem extends Component {


    render() {
        const {children, index, selected, onTabItemClick} = this.props
        return (
            <div className={`tab-item${selected ? ' active' : ''}`} role="tab-item" onClick={e => onTabItemClick(index,e)}>
                <a href="javascript:">{children}</a>
            </div>
        );
    }
}
