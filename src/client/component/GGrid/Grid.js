import React from 'react';
import classNames from 'classnames';
import './style.less';

const Grid = ({ className, children }) => (
    <div className={classNames('cine-grid', className)}>{children}</div>
);

export default Grid;
