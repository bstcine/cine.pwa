import React from 'react';
import Button from '@material-ui/core/Button';
import { CIcon } from './../Icon';
import './style.less';

export const CFloatingButton = ({ text, iconName, color, onClick, ...props }) => {
    const icon = <CIcon name={iconName} />;
    const _color = color ? color : 'secondary';
    return (
        <div className="Floating Container">
            <Button
                variant="fab"
                color={_color}
                onClick={onClick}
                className="Button Location"
                {...props}>
                {icon}
            </Button>
        </div>
    );
};
