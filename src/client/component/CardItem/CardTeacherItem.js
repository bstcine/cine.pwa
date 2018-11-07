import React from 'react';
import './styleTeacher.less';

export const CardTeacher = ({ value, style, actions }) => {
    const imgBG = `url(${value.head_img}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/experiences';
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
                    <div className="title">{value.name_en}</div>
                    <div className="desc">{value.brief}</div>
                </div>
            </div>
        </React.Fragment>
    );
};
