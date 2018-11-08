import React from 'react';
import { CCard } from '@/component/_base';
import './styleTeacher.less';

export const CardTeacher = ({ value, hover, actions }) => {
    const imgBG = `url(${value.head_img}) center center / cover no-repeat`;
    const href = value.link ? value.link : `//www.bstcine.com/teacher/${value.user_id}`;
    return (
        <CCard hover={hover}>
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
                    <div className="title">
                        {value.name_en ? `${value.name_en}` : `${value.name}`}
                    </div>
                    <div className="desc">{value.brief}</div>
                </div>
            </div>
        </CCard>
    );
};
