import React from 'react';
import classNames from 'classnames';

const GIcon = ({ name, className }) => {
    return <i className={classNames('material-icons', className)}>{name}</i>;
};

export default GIcon;
