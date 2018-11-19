import React from 'react';
import { CCardContainer, CCard } from '@/component/_base';
import './../../asset/style/subpage.less';

const CardCommentItem = ({ value, hover }) => {
    return (
        <CCard hover={hover}>
            <div className="cardComment">
                <div className="img-c">
                    <div
                        className="img"
                        style={{
                            background: `url(${
                                value.img
                            }) center center / cover no-repeat`,
                        }}
                    />
                </div>
            </div>
        </CCard>
    );
};

const CommentList = ({ comments, layout, className, actions }) => {
    let list = comments.map((item, i) => {
        return <CardCommentItem key={i} value={item} hover="none" />;
    });

    return (
        <CCardContainer layout={layout} gap="large">
            {list}
        </CCardContainer>
    );
};
export default CommentList;
