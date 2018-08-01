import React from 'react';
import { CButton } from '@/component/_base';

const svgStar = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        role="presentation"
        aria-hidden="true"
        focusable="false">
        <path d="M971.5 379.5c9 28 2 50-20 67L725.4 618.6l87 280.1c11 39-18 75-54 75-12 0-23-4-33-12l-226.1-172-226.1 172.1c-25 17-59 12-78-12-12-16-15-33-8-51l86-278.1L46.1 446.5c-21-17-28-39-19-67 8-24 29-40 52-40h280.1l87-278.1c7-23 28-39 52-39 25 0 47 17 54 41l87 276.1h280.1c23.2 0 44.2 16 52.2 40z" />
    </svg>
);
const svgStarHalf = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        role="presentation"
        aria-hidden="true"
        focusable="false">
        <path d="M510.2 23.3l1 767.3-226.1 172.2c-25 17-59 12-78-12-12-16-15-33-8-51l86-278.1L58 447.5c-21-17-28-39-19-67 8-24 29-40 52-40h280.1l87-278.1c7.1-23.1 28.1-39.1 52.1-39.1z" />
    </svg>
);

export const CardItem = ({ value, actions }) => {
    return (
        <React.Fragment>
            <div className="card">
                <a href="/experiences" target="_blank">
                    <div className="img-c">
                        <div
                            className="img"
                            style={{
                                background: `url(${
                                    value.cover
                                }) center center / cover no-repeat`,
                            }}
                        />
                    </div>
                </a>

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
                        <div className="price">￥1,211 per night · Free</div>
                    </div>

                    <div className="btm-right">
                        <div className="rate">
                            <CButton variant="outlined" className="button">Cancel</CButton>
                            <CButton variant="contained" color="secondary" className="button">
                                Confirm
                            </CButton>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
