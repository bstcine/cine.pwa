import React from 'react';
import { CCard } from '@/component/_base';
import './styleTeacher.less';

export const CardTeacher = ({ value, hover, actions }) => {
    const imgBG = `url(${value.head_img}) center center / cover no-repeat`;
    const href = value.link
        ? value.link
        : `//www.bstcine.com/teacher/${value.id}`;
    // alert(hover)
    return (
        <CCard href={href}>
            <div className="cardTeacher">
                <div className="img-c">
                    <div className="img" style={{ background: `${imgBG}` }} />
                </div>

                <div className="text-c">
                    <div className="title">
                        {value.name}
                        {value.name_en ? `.${value.name_en}` : ``}
                    </div>
                    <div className="desc">{value.remark_mentor}</div>
                </div>
            </div>
        </CCard>
    );
};
