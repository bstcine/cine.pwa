import React from 'react';
import { CCard } from '@/component/_base';
import { svgStar, svgStarHalf, svgUnLike, svgLike } from '@/constant/svg';
import './style.less';

export const CardItem = ({ value, hover, layout, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link
        ? value.link
        : '//www.airbnb.com/experiences/256212?location=Barcelona&adults=1&source=p2&currentTab=experience_tab&searchId=2eee1c8d-e12d-4b64-ad42-25592c7bc6e0&federatedSearchId=9224d7fa-d3b9-436b-b635-6df21fca9f8e&sectionId=1d9c5719-04e1-4f52-85a1-3d9d4f62b21a';
    const classCard = layout === '112' ? 'cardItem cardItem112' : 'cardItem';
    const classIMG = layout === '112' ? 'img-cl item-left' : 'img-c';
    const classText = layout === '112' ? 'text-c item-right' : 'text-c';
    const classTitle = layout === '112' ? 'title' : 'title title-space';

    return (
        <CCard hover={hover}>
            <div className={classCard}>
                <div className={classIMG}>
                    <div
                        className="favorite"
                        onClick={() => {
                            actions.changeFavoriteStatus(value.id);
                        }}
                    >
                        {value.like_status === 1 ? svgLike : svgUnLike}
                    </div>
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: `${imgBG}` }}
                        />
                    </a>
                </div>

                <div className={classText}>
                    <div className="subTitle">{value.sub_title}</div>
                    <div
                        className={classTitle}
                        onClick={() => {
                            actions.showDetail(value);
                        }}
                    >
                        {value.title}
                    </div>
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
