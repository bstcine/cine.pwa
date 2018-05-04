/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import '../asset/style/index.less';
import UserHeader from '@/entry/user/component/UserHeader';
import UserContent from '@/entry/user/component/UserContent';

const User = ({ topicId, isJustUserRoute, user, handleClick }) => {
    return (
        <React.Fragment>
            <UserHeader
                isJustUserRoute={isJustUserRoute}
                topicId={topicId}
                user={user}
                handleClick={handleClick}
            />
            <UserContent isJustUserRoute={isJustUserRoute} topicId={topicId} />
        </React.Fragment>
    );
};

export default User;
