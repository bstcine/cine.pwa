import React from 'react';
import { CCard } from '@/component/_base';
import './styleTeacher.less';

export const CardTeacher = ({ value, hover, isMentor }) => {
    const imgBG = `url(${value.head_img}) center center / cover no-repeat`;
    const href = `//www.bstcine.com/teacher/${value.id}`;
    const desc = isMentor ? value.remark_mentor : value.brief;
    // alert(hover)
    return (
        <CCard href={isMentor ? null : href} hover={!isMentor ? null : 'none'}>
            <div className="cardTeacher">
                <div className={isMentor ? 'img-11-circle img-c' : 'img-11'}>
                    <div className="img" style={{ background: `${imgBG}` }} />
                </div>

                <div className="text-c">
                    <div className="title">
                        {value.name}
                        {value.name_en ? `.${value.name_en}` : ``}
                    </div>
                    <div className="desc">{desc}</div>
                </div>
            </div>
        </CCard>
    );
};
