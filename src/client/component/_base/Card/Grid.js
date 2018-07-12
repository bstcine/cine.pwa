import React from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const gridCls = `${baseprefix}-grid`;

const Grid = ({ className, children, gap }) => {
    return (
        <div
            className={classNames(gridCls, className, {
                [`${gridCls}__gap--${gap}`]: !!gap,
            })}>
            {children}
        </div>
    );
};

export default Grid;
