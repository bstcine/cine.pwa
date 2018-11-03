import React from 'react';
import { svgStar, svgStarHalf } from '@/constant/svg';
import './style.less';

export const CardItem = ({ value, css, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    const classCard = css === 'lnr' ? 'cardItem cardItemLNR' : 'cardItem';
    const classIMG = css === 'lnr' ? 'img-cl item-left' : 'img-c';
    const classText = css === 'lnr' ? 'text-c item-right' : 'text-c';
    const classTitle = css === 'lnr' ? 'title' : 'title title-space';
    
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export const CardItem112 = ({ value, actions }) => {
    return (
        <React.Fragment>
            <div className="card card112">
                <div className="img-c112">
                    <a href="/experiences" target="_blank">
                        <div
                            className="img"
                            style={{
                                background: `url(${
                                    value.cover
                                }) center center / cover no-repeat`,
                            }}
                        />
                    </a>
                </div>

                <div className="text-c">
                    <div className="line1 sub-title">{value.sub_title}</div>
                    <div className="line2 title">{value.title}</div>
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
        </React.Fragment>
    );
};
