import React, { Component } from 'react';
import classNames from 'classnames';

export default class TabItem extends Component {
    static defaultProps = {
        className: 'tab-item',
        id: null,
    };

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(index, id, e) {
        let { onTabItemClick, onClick } = this.props;
        onTabItemClick && onTabItemClick(index, id, e);
        onClick && onClick(index, id, e);
    }

    render() {
        const {
            id,
            children,
            className,
            index,
            indicator,
            selected,
            style,
            activeStyle,
        } = this.props;
        let tabItemStyle = null;
        if (style && activeStyle) {
            tabItemStyle = selected ? activeStyle : style;
        }
        return (
            <div
                className={classNames(className, { active: selected })}
                role="tab-item"
            >
                <a
                    style={tabItemStyle}
                    onClick={e => this.clickHandler(index, id, e)}
                >
                    {children}
                </a>
                {Number(indicator) > 0 && (
                    <span className="tab-indicator">{String(indicator)}</span>
                )}
            </div>
        );
    }
}
