import React from 'react';
import '../GLayout/style.less';

const Main = ({ children }) => {
    return (
        <div className="gmain">
            <div className="gcontainer">{children}</div>
        </div>
    );
};

export default Main;
