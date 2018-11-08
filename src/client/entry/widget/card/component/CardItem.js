import React from 'react';
import { CButton, CCard } from '@/component/_base';

export const CardItem111 = ({ value, actions }) => {
    return (
        <CCard>
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
        </CCard>
    );
};
