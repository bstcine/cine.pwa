import React from 'react';
import classNames from 'classnames';
import './style.less';
const GFloatingBox = ({ children, className }) => {
    return (
        <div className={classNames('cine-floating-box', className)}>
            {children}
        </div>
    );
};
export default GFloatingBox;
