import React from 'react';
import classNames from 'classnames';

export const CIcon = ({ name, className }) => {
    return <i className={classNames('material-icons', className)}>{name}</i>;
};
