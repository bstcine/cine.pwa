import React from 'react';

export const CardCourse = ({ value, style, actions }) => {
    const imgBG = `url(${value.cover}) center center / cover no-repeat`;
    const href = value.link ? value.link : '/content/course?cid=';
    return (
        <React.Fragment>
            <div className="cardTeacher">
                <div className="img-c">
                    <a href={href} target="_blank">
                        <div
                            className="img"
                            style={{ background: { imgBG } }}
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
