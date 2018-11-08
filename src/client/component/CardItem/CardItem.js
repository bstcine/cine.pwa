import React from 'react';
import { CCard } from '@/component/_base';
import { svgStar, svgStarHalf } from '@/constant/svg';
import './style.less';

export const CardItem = ({ value, hover, layout, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    const classCard = layout === '112' ? 'cardItem cardItem112' : 'cardItem';
    const classIMG = layout === '112' ? 'img-cl item-left' : 'img-c';
    const classText = layout === '112' ? 'text-c item-right' : 'text-c';
    const classTitle = layout === '112' ? 'title' : 'title title-space';

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
                    <div className="subTitle">{value.sub_title}</div>
                    <div className={classTitle}>{value.title}</div>
                    <div className="price">￥1,211 per night · Free</div>
                    <div className="rate">
                        <span className="star5">{svgStar}</span>
                        <span className="star5">{svgStar}</span>
                        <span className="star5">{svgStar}</span>
                        <span className="star5">{svgStar}</span>
                        <span className="star5">{svgStarHalf}</span>
                        <span className="number">
                            20{value.favorite}· Superhost
                        </span>
                    </div>
                </div>
            </div>
        </CCard>
    );
};
