import React from 'react';
import classNames from 'classnames';
import './iconfont.css';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Icon;
// import './iconfont.js';
// import './style.less';
/**
 * mi-xxx || xxx --> material-icons
 * ci-xxx --> cine-icons
 */
const Icon = ({ className, children, onClick }) => {
    if (children.indexOf('ci-') === 0) {
        return (
            <i
                className={classNames(cls, 'cine-icons', className, children)}
                onClick={onClick}
            />
            // <svg className="icon" aria-hidden="true">
            //     <use xlinkHref={'#' + children} />
            // </svg>
        );
    } else {
        return (
            <i className={classNames(cls, 'material-icons', className)}>
                {children.indexOf('mi-') === 0 ? children.substr(3) : children}
            </i>
        );
    }
};

export default Icon;
