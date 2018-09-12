import React, { Component } from 'react';
import classNames from 'classnames';

class Swiper extends Component {
    render() {
        const { children, className } = this.props;
        return (
            <div className={classNames('swiper', className)}>{children}</div>
        );
    }
}

export default Swiper;
