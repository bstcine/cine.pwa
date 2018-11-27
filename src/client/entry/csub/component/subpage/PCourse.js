import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { CourseList } from '@/component/CardItem';

const FJCourseItem = ({course}) => {
    if (!course) {
        return <React.Fragment></React.Fragment>;
    }
    let { id, name, img, categorys } = course;
    let remark = null;
    for (let i = 0; i < categorys.length; i++) {
        if (!categorys[i].name) {
            continue;
        }
        if (!remark) {
            remark = categorys[i].name + (categorys[i].remark || '');
        }else {
            remark = remark + '\n' + categorys[i].name + (categorys[i].remark || '');
        }
    }
    return <div className="FJCourseComponent">
        <div className="courseImageContain" onClick={()=>{location.href='/?tab='+id}}>
            <img className="courseImage" src={img}/>
        </div>
        <br/>
        <p className="courseName">{name}</p>
        <br/>
        <p className="courseRemark">{remark}</p>
        <br/>
    </div>;
};

const FJCourseList = ({list}) => {
    let fjList = list.map((item, index) => {
        return <FJCourseItem key={index} course={item} />
    });
    return (
        <React.Fragment>
            {fjList}
        </React.Fragment>
    );
};

class PCourse extends React.PureComponent {
    render() {
        const { isCourse, list } = this.props;
        const layout = isCourse ? '234' : '122';
        let exList = isCourse ? <CourseList list={list} hover="lighten" /> : <FJCourseList list={list} />;
        return (
            <CPanel title="核心课程">
                <CCardContainer layout={layout}>{exList}</CCardContainer>
            </CPanel>
        );
    }
};

export default PCourse;

