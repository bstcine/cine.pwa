import './style.less';
import classNames from 'classnames';
import React from 'react';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Mask;

const Mask = ({ transparent, className, onClick }) => (
    <div
        className={classNames(
            cls,
            { [`${cls}--transparent`]: transparent },
            className
        )}
        onClick={onClick}
    />
);

export default Mask;
