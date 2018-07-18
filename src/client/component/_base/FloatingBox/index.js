import React from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.FloatingBox;

const FloatingBox = ({ className, children }) => (
    <div className={classNames(`${cls}__container`, className)}>
        <div className={`${cls}__content`}>{children}</div>
    </div>
);

export default FloatingBox;
