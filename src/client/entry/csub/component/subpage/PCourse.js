import React from 'react';
import { CPanel, CCardContainer, CCard } from '@/component/_base';
import { CourseList } from '@/component/CardItem';

const FJCourseItem = ({ course }) => {
    if (!course) {
        return <React.Fragment />;
    }
    let { id, name, img, categorys } = course;
    let remark = null;
    for (let i = 0; i < categorys.length; i++) {
        if (!categorys[i].name) {
            continue;
        }
        if (!remark) {
            remark = categorys[i].name + (categorys[i].remark || '');
        } else {
            remark =
                remark + '\n' + categorys[i].name + (categorys[i].remark || '');
        }
    }
    return (
        <CCard hover="none">
            <div className="cardFJCourse">
                <div
                    className="courseImageContain"
                    onClick={() => {
                        location.href = '/?tab=' + id;
                    }}
                >
                    <img className="courseImage" src={img} />
                </div>
                <br />
                <p className="courseName">{name}</p>
                <div className="courseRemark">{remark}</div>
            </div>
        </CCard>
    );
};

const FJCourseList = ({ list }) => {
    let fjList = list.map((item, index) => {
        return <FJCourseItem key={index} course={item} />;
    });
    return fjList;
};

class PCourse extends React.PureComponent {
    render() {
        const { isCourse, list } = this.props;
        const layout = isCourse ? '234' : '122';
        let exList = isCourse ? (
            <CourseList list={list} hover="lighten" />
        ) : (
            <FJCourseList list={list} />
        );
        return (
            <CPanel title="核心产品">
                <CCardContainer layout={layout} gap={isCourse ? null : 'large'}>
                    {exList}
                </CCardContainer>
            </CPanel>
        );
    }
}

export default PCourse;
