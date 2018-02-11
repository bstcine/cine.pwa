import React, {Component} from 'react';

export default class TabItem extends Component {
    static defaultProps = {
        className: 'tab-item',
        id: null
    };

    render() {
        const {id, children, className, index, selected, onTabItemClick} = this.props;
        return (
            <div className={`${className}${selected ? ' active' : ''}`} role="tab-item">
                <a href="javascript:" onClick={e => onTabItemClick(index,id, e)}>
                    {children}
                </a>
            </div>
        );
    }
}
