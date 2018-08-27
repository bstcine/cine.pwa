import React, { Component } from 'react';
import classNames from 'classnames';

export default class Time extends Component {
    render() {
        const { className } = this.props;
        return (
            <div className={classNames('mp_time', className)}>
                <span className="mp_time__current">00:00</span>
                <span>/</span>
                <span className="mp_time__total">11:11</span>
            </div>
        );
    }
}
