import React, {Component} from 'react';

export default class TabItem extends Component {
    static defaultProps = {
        className: 'tab-item',
        id: null
    };

    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(index, id, e) {
        let {onTabItemClick, onClick} = this.props;
        onTabItemClick && onTabItemClick(index, id, e);
        onClick && onClick(index, id, e);
    }

    render() {
        const {id, children, className, index, indicator, selected} = this.props;
        return (
            <div className={`${className}${selected ? ' active' : ''}`} role="tab-item">
                <a href="javascript:" onClick={e => this.clickHandler(index, id, e)}>
                    {children}
                </a>
                {(Number(indicator) > 0) && <span className="tab-indicator">{indicator + ''}</span>}
            </div>
        );
    }
}
