/* eslint-disable prettier */
import React from 'react';
import ReactDOM from 'react-dom';
import commonUtil from '@/util/_base/commonUtil';
import { Tabs, TabItems, TabItem, TabPanels, TabPanel } from '@/component/Tabs';
import Comments from './Comments';
import CourseSet from './CourseSet';

export default class DetailDesc extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            courseSet: null,
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        if (this.props.course) {
            let cid = this.props.course.id;
            let set_id = this.props.course.set_id;
            this.props
                .onLoadSetAndComments(cid, set_id)
                .then(({ comments, courseSet }) => {
                    this.setState({ comments, courseSet });
                });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let tabs = ReactDOM.findDOMNode(this.refs.tabs);
        let courseDetail = ReactDOM.findDOMNode(this.refs.courseDetail);

        if (tabs && courseDetail) {
            let courseDetailOffset = courseDetail.getBoundingClientRect();
            let clazz = 'tab-fixed';
            if (courseDetailOffset.top < 0) {
                if (!tabs.classList.contains(clazz)) tabs.classList.add(clazz);
            } else {
                if (tabs.classList.contains(clazz))
                    tabs.classList.remove(clazz);
            }
        }
    }

    render() {
        let { course, isIOSAPP } = this.props;
        let courseSet = this.state.courseSet;
        let tabItem_desc = course.object_type === '1' ? '课程概要' : '详情';
        let tabItem_evaluate = course.object_type === '1' ? '学员评价' : '评价';
        let will_show_lessons = course.object_type === '1' && !isIOSAPP;

        return (
            <div className="course-detail" ref="courseDetail">
                <Tabs ref="tabs">
                    <TabItems>
                        <TabItem>{tabItem_desc}</TabItem>
                        {will_show_lessons ? <TabItem>课程目录</TabItem> : null}
                        <TabItem>{tabItem_evaluate}</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <div className="course-feature">
                                {courseSet ? (
                                    <CourseSet value={courseSet} />
                                ) : null}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: course.h5remark,
                                    }}
                                />
                            </div>
                        </TabPanel>

                        {will_show_lessons ? (
                            <TabPanel>
                                {course.catalog ? (
                                    <div
                                        className="course-feature"
                                        dangerouslySetInnerHTML={{
                                            __html: course.catalog,
                                        }}
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
                                                                course.children
                                                                    .length &&
                                                                course.children.map(
                                                                    (
                                                                        chapter,
                                                                        i
                                                                    ) => {
                                                                        return (
                                                                            <li
                                                                                key={
                                                                                    i
                                                                                }
                                                                            >
                                                                                {
                                                                                    chapter.name
                                                                                }
                                                                                <ul className="lesson-list">
                                                                                    {chapter.children &&
                                                                                        chapter
                                                                                            .children
                                                                                            .length &&
                                                                                        chapter.children.map(
                                                                                            (
                                                                                                lesson,
                                                                                                i
                                                                                            ) => {
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
                                                                                                            <span className="meta">
                                                                                                                {commonUtil.durationFormat(
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
                                                                    }
                                                                )}
                                                        </ul>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </TabPanel>
                        ) : null}

                        <TabPanel>
                            <Comments comments={this.state.comments} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        );
    }
}
