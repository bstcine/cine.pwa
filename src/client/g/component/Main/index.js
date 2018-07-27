import React from 'react';

const Main = ({ children }) => {
    return (
        <div className="gmain">
            <div className="gcontainer">{children}</div>
        </div>
    );
};

export default Main;
