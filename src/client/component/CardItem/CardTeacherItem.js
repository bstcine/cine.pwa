import React from 'react';
import { CCard } from '@/component/_base';
import CommonUtil from '@/util/_base/commonUtil';
import './styleTeacher.less';

export const CardTeacher = ({ value, hover, isMentor }) => {
    const href = `//www.bstcine.com/teacher/${value.id}`;
    const desc = isMentor ? value.remark_mentor : value.brief;
    const clsDesc = isMentor ? 'desc' : 'desc desc6';
    const imgBG = CommonUtil.getImageBackground(
        isMentor ? value.head_img : value.img
    );
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
                    <div className={clsDesc}>{desc}</div>
                </div>
            </div>
        </CCard>
    );
};
