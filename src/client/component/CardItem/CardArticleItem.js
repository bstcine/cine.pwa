import React from 'react';
import { CCard } from '@/component/_base';
import './styleArticle.less';

export const CardArticle = ({ value, hover, layout, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const classIMG = 'img-169-left item-left';
    const classText = 'text-c item-right';

    return (
        <CCard hover={hover} href={value.link}>
            <div className="cardArticle">
                <div className={classIMG}>
                    <div className="img" style={{ background: `${imgBG}` }} />
                </div>

                <div className={classText}>
                    <div className="text-title">{value.title}</div>
                    <div className="subTitle">{value.subtitle}</div>
                </div>
            </div>
        </CCard>
    );
};
