import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cls = `${baseprefix}-floating-box`;

const FloatingBox = ({ className, children }) => (
    <div className={classNames(`${cls}__container`, className)}>
        <div className={`${cls}__content`}>{children}</div>
    </div>
);

export default FloatingBox;
