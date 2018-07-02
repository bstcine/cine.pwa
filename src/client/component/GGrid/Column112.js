import React from 'react';
import classNames from 'classnames';

const Column112 = ({ className, children, href }) => {
    if (href) {
        return (
            <a
                className={classNames('cine-grid_col-1-1-2', className)}
                href={href}>
                {children}
            </a>
        );
    } else {
        return (
            <div className={classNames('cine-grid_col-1-1-2', className)}>
                {children}
            </div>
        );
    }
};

export default Column112;