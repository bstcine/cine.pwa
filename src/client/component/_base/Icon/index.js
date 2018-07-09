import React from 'react';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';

export const CIcon = ({ name, className }) => {
    return <i className={classNames('material-icons', className)}>{name}</i>;
};

export const CIconButton = ({ iconName, selected, onClick }) => {
    const color = selected === true ? 'secondary' : 'primary';
    const icon = <CIcon name={iconName} color={color} />;
    return <IconButton onClick={onClick}>{icon}</IconButton>;
};
