import React from 'react';
import { CCard } from '@/component/_base';
import './styleTeacher.less';

export const CardTeacher = ({ value, hover, isMentor }) => {
  
    const href = `//www.bstcine.com/teacher/${value.id}`;
    const desc = isMentor ? value.remark_mentor : value.brief;
    const img = isMentor ? value.head_img : `//www.bstcine.com/f/${value.img}`;
    const imgBG = `url(${img}) center center / cover no-repeat`;
    // alert(hover)
    return (
        <CCard href={isMentor ? null : href} hover={!isMentor ? null : 'none'}>
            <div className="cardTeacher">
                <div className={isMentor ? 'img-11-circle img-c' : 'img-34'}>
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
