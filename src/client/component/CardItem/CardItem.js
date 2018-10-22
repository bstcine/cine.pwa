import React from 'react';
import { svgStar, svgStarHalf } from '@/constant/svg';

export const CardItem2 = ({ value, style, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    return (
        <React.Fragment>
            <div className="cardTeacher">
                <div className="img-c">
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: `${imgBG}` }}
                        />
                    </a>
                </div>

                <div className="text-c">
                    <div className="title">{value.price}</div>
                    <div className="desc">{value.title}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const CardItem = ({ value, style, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';

    return (
        <React.Fragment>
            <div className="cardItem">
                <div className="img-c">
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: `${imgBG}` }}
                        />
                    </a>
                </div>

                <div className="text-c">
                    <div className="subTitle">{value.sub_title}</div>
                    <div className="title">{value.title}</div>
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
