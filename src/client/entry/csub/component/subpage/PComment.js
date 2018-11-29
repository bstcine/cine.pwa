import React from 'react';
import { CPanel, CCardContainer, CCard } from '@/component/_base';
import Clink from './Clink';

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
    let link = <Clink text="更多" href="/comments" target="_blank" />;
    let commentlist = list.map((item, i) => {
        if (limit && i >= limit) return '';

        return <CardCommentItem key={i} value={item} hover="none" />;
    });

    return (
        <CPanel title="口碑好评" ext={link}>
            <CCardContainer layout="123" gap="large">
                {commentlist}
            </CCardContainer>
        </CPanel>
    );
};
export default PComment;
