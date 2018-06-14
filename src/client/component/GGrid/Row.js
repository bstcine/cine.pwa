import React from 'react';
import classNames from 'classnames';

const Row = ({ className, children }) => (
    <div className={classNames('cine-grid_row', className)}>{children}</div>
);

export default Row;
