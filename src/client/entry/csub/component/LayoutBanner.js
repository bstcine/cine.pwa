import React from 'react';

const LayoutBanner = ({ isShow }) => {
    const url = `http://static.bstcine.com/m/subpage/mentor.jpg`;
    return (
        <div
            className="layout-banner"
            style={{
                outline: 'none',
                background: `url(${url}) center center / cover no-repeat`,
            }}
        />
    );
};
export default LayoutBanner;
