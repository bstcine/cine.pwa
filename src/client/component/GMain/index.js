import React from 'react';
import '../GLayout/style.less';

const Main = ({ children }) => {
    return (
        <div className="main">
            <div className="container">{children}</div>
        </div>
    );
};

export default Main;
