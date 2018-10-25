import React from 'react';
import { CButton } from '@/component/_base';
import { svgStar, svgStarHalf } from '@/constant/svg';

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

export const CardItem111 = ({ value, actions }) => {
    return (
        <React.Fragment>
            <div className="card1">
                <div className="card1-top">
                    <div className="img-c111">
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
                    </div>
                </div>

                <div className="card1-m" />

                <div className="card1-btm">
                    <div className="btm-left">
                        <div className="line2 price">
                            ￥1,211 per night · Free
                        </div>
                    </div>

                    <div className="btm-right">
                        <div className="rate">
                            <CButton variant="outlined">Cancel</CButton>
                            <CButton
                                variant="contained"
                                color="secondary"
                                className="button"
                            >
                                Confirm
                            </CButton>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const CardItem245 = ({ value, actions }) => {
    return (
        <React.Fragment>
            <div className="card245">
                <div className="img-c">
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
                    <div className="line1 title">{value.price}</div>
                    <div className="line3 sub-title">{value.title}</div>
                </div>
            </div>
        </React.Fragment>
    );
};
