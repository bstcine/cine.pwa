import React, { Component } from 'react';

export default class Notice extends Component {
    static defaultProps = {
        notices: [],
    };

    render() {
        console.log(`GlobalNotice`);
        let { notices } = this.props;
        return (
            <div className="notice-container">
                <div className="notice-text" />
                <ul className="notice-list">
                    {notices.map((item, i) => {
                        return (
                            <li className="notice-item" key={i}>
                                <a href={item.href}>
                                    <span className="notice-tag">
                                        {item.tag}
                                    </span>
                                    <span className="notice-title">
                                        {item.name}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
