import React from 'react';
import Button from '@material-ui/core/Button';
import { CIcon } from './../Icon';
import './style.less';

export const CFloatingButton = ({ text, iconName, onClick, ...props }) => {
    const icon = <CIcon name={iconName} />;
    return (
        <div className="Floating Container">
            <Button
                variant="fab"
                color="secondary"
                onClick={onClick}
                className="Button"
                {...props}>
                {icon}
            </Button>
        </div>
    );
};
