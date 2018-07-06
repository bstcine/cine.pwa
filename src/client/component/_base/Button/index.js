import React from 'react';
import Button from '@material-ui/core/Button';
import { CIcon } from './../Icon';
import './index.less';

export const CFloatingButton = ({ text, iconName, onClick, ...props }) => {
    const icon = <CIcon name={iconName} />;
    return (
        <div className="Button FloatingDiv">
            <Button
                variant="fab"
                color="secondary"
                onClick={onClick}
                className="FloatingButton"
                {...props}>
                {icon}
            </Button>
        </div>
    );
};
