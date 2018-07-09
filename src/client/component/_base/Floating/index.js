import React from 'react';
import Button from '@material-ui/core/Button';
import { CIcon } from './../Icon';
import './style.less';

export const CFloatingButton = ({ text, iconName, color, onClick, ...props }) => {
    const icon = <CIcon name={iconName} />;
    const _color = color === undefined ? 'secondary' : color;
    return (
        <div className="Floating Container">
            <Button
                variant="fab"
                color={_color}
                onClick={onClick}
                className="Button"
                {...props}>
                {icon}
            </Button>
        </div>
    );
};
