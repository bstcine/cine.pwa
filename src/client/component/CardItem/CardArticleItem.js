import React from 'react';
import { CCard } from '@/component/_base';
import './styleArticle.less';

export const CardArticleItem = ({ value, hover, layout, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    const classCard = layout === '112' ? 'cardItem cardItem112' : 'cardItem';
    const classIMG = layout === '112' ? 'img-cl item-left' : 'img-c';
    const classText = layout === '112' ? 'text-c item-right' : 'text-c';

    return (
        <CCard hover={hover}>
            <div className={classCard}>
                <div className={classIMG}>
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: `${imgBG}` }}
                        />
                    </a>
                </div>

                <div className={classText}>
                    <div className="text-title">{value.title}</div>
                    <div className="subTitle">{value.sub_title}</div>
                </div>
            </div>
        </CCard>
    );
};
