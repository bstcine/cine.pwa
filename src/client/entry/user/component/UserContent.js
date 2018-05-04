import React from 'react';

const UserContent = ({ content, isJustUserRoute, ...props }) => {
    return (
        <div
            className={isJustUserRoute ? 'user-content just-user' : 'user-content'}>
            {content}
        </div>
    );
};

export default UserContent;
