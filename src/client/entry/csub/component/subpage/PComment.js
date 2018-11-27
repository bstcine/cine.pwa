import React from 'react';
import { CPanel, CCardContainer, CCard } from '@/component/_base';
// import './../../asset/style/subpage.less';

const CardCommentItem = ({ value, hover }) => {
    return (
        <CCard hover={hover}>
            <div className="cardComment">
                <div className="img-916">
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

const PComment = ({ list, limit, actions }) => {
    let href = '/comments';
    let commentlist = list.map((item, i) => {
        if (limit && i >= limit) return '';

        return <CardCommentItem key={i} value={item} hover="none" />;
    });

    return (
        <CPanel title="口碑好评" ext_title="更多" ext_href={href}>
            <CCardContainer layout="123" gap="large">
                {commentlist}
            </CCardContainer>
        </CPanel>
    );
};
export default PComment;
