import React from 'react';
import classNames from 'classnames';
import './iconfont.css';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Icon;

/**
 * mi-xxx || xxx --> material-icons
 * ci-xxx --> cine-icons
 */
const Icon = ({ className, children, onClick }) => {
    if (!children) return null;
    if (children.indexOf('ci-') === 0) {
        return (
            <i
                className={classNames(cls, 'cine-icons', className, children)}
                onClick={onClick}
            />
        );
    }
    if (children.indexOf('svg-') === 0) {
        let svgTag = require('./svg/' + children.substr(4) + '.svg');
        return (
            <i
                className={classNames(cls, 'svg-icons', className, children)}
                dangerouslySetInnerHTML={{ __html: svgTag }}
                onClick={onClick}
            />
        );
    } else {
        return (
            <i
                className={classNames(cls, 'material-icons', className)}
                onClick={onClick}
            >
                {children.indexOf('mi-') === 0 ? children.substr(3) : children}
            </i>
        );
    }
};

export default Icon;
