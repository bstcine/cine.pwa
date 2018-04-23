/**
 * Created by joe on 4/17/18.
 */
import React from 'react';
import timeUtil from '@/util/timeUtil';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs';
import Comments from './Comments';
import CourseSet from './CourseSet';


export default class DetailDesc extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {course, courseSet, courseComments, isIOSAPP, onClickCourseSetLink} = this.props;
        let _tabItem_desc = course.object_type === '1' ? '课程概要' : '详情';
        let _tabItem_evaluate = course.object_type === '1' ? '学员评价' : '评价';
        let _will_show_lessons = course.object_type === '1' && !isIOSAPP;

        return (
            <div className="course-detail" ref="courseDetail">
                <Tabs ref="tabs">
                    <TabItems>
                        <TabItem>{_tabItem_desc}</TabItem>
                        {_will_show_lessons ? (<TabItem>课程目录</TabItem>) : null}
                        <TabItem>{_tabItem_evaluate}</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            {courseSet ? (
                                <CourseSet value={courseSet} onLink={onClickCourseSetLink}/>
                            ) : null}
                            <div
                                className="course-feature"
                                dangerouslySetInnerHTML={{__html: course.h5remark}}
                            />
                        </TabPanel>

                        {_will_show_lessons ? (
                            <TabPanel>
                                {course.catalog ? (
                                    <div
                                        className="course-feature"
                                        dangerouslySetInnerHTML={{__html: course.catalog}}
                                    />
                                ) : null}

                                <div className="course-category">
                                    <ul className="course-list">
                                        {course.contents &&
                                        course.contents.length &&
                                        course.contents.map((course, i) => {
                                            return (
                                                <li key={i}>
                                                    {course.name}
                                                    <ul className="chapter-list">
                                                        {course.children &&
                                                        course.children.length &&
                                                        course.children.map((chapter, i) => {
                                                            return (
                                                                <li key={i}>
                                                                    {chapter.name}
                                                                    <ul className="lesson-list">
                                                                        {chapter.children &&
                                                                        chapter.children
                                                                            .length &&
                                                                        chapter.children.map(
                                                                            (lesson, i) => {
                                                                                return (
                                                                                    <li
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            lesson.name
                                                                                        }
                                                                                        {lesson.duration ? (
                                                                                            <span
                                                                                                className="meta">
                                                                                                                {timeUtil.durationFormat(
                                                                                                                    lesson.duration
                                                                                                                )}
                                                                                                            </span>
                                                                                        ) : null}
                                                                                    </li>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </ul>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </TabPanel>
                        ) : null}

                        <TabPanel>
                            <Comments comments={courseComments}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </div>

        );
    }
}
