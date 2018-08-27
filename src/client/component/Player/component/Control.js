import React from 'react';

const Control = ({ children }) => {
    return <div className="mp_control">{children}</div>;
};

const ControlLeft = ({ children }) => {
    return <div className="mp_control__left">{children}</div>;
};

const ControlRight = ({ children }) => {
    return <div className="mp_control__right">{children}</div>;
};

export { Control, ControlLeft, ControlRight };
