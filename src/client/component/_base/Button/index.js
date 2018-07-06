import React from 'react';
import Button from '@material-ui/core/Button';
import { CIcon } from './../Icon';


export const CFloatingButton = ({ text, iconName, onClick, ...props }) => {
    const icon = <CIcon name={iconName} />;
    return (
        <Button variant="fab" color="secondary" onClick={onClick} {...props}>
            {icon}
        </Button>
    );
};
