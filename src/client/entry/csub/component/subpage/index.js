import React from 'react';
import { CPanel, CCardContainer } from '@/component/_base';
import { SideBarSubPage } from '@/component/SideBar/SubPage';
import { TeacherList, ArticleList } from '@/component/CardItem';
import CommentList from './CommentList';
import CourseExList from './CourseList';
import './../../asset/style/index.less';

export default class SubPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.ref = React.createRef();
        this.refTeacher = React.createRef();
        this.refComment = React.createRef();
        this.refArticle = React.createRef();
        this.refResource = React.createRef();
    }

    onChange(sb_value) {
        switch (sb_value) {
            case 'course':
                this.onScroll(this.ref);
                break;
            case 'teacher':
                this.onScroll(this.refTeacher);
                break;
            case 'comment':
                this.onScroll(this.refComment);
                break;
            case 'article':
                this.onScroll(this.refArticle);
                break;
            case 'resource':
                this.onScroll(this.refResource);
                break;
        }
    }

    onScroll(ref) {
        // this.handleScroll(ref);

        let nav = ref.current;
        if (nav) {
            let scrollY =
                nav.getBoundingClientRect().top +
                document.documentElement.scrollTop;
            window.scrollTo(0, scrollY);
        }
    }

    handleScroll(ref) {
        let c_h = `panelHidden`;

        let p1 = this.ref.current;
        let p2 = this.refTeacher.current;
        let p3 = this.refComment.current;
        let p4 = this.refArticle.current;
        let p5 = this.refResource.current;
        if (!p1.classList.contains(c_h)) p1.classList.add(c_h);
        if (!p2.classList.contains(c_h)) p2.classList.add(c_h);
        if (!p3.classList.contains(c_h)) p3.classList.add(c_h);
        if (!p4.classList.contains(c_h)) p4.classList.add(c_h);
        if (!p5.classList.contains(c_h)) p5.classList.add(c_h);

        let nav = ref.current;
        if (nav) {
            if (nav.classList.contains(c_h)) nav.classList.remove(c_h);
        }
    }

    render() {
        const {
            isCourse,
            isMentor,
            courses,
            teachers,
            articles,
            comments,
        } = this.props;
        const courseList = courses.toJS();
        const teacherList = teachers.toJS();
        const articleList = articles.toJS();
        const commentList = comments.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <SideBarSubPage value="course" onChange={this.onChange} />

                <div ref={this.ref}>
                    <CPanel title="核心课程">
                        <CourseExList
                            isCourse={isCourse}
                            courses={courseList}
                        />
                    </CPanel>
                </div>

                <div ref={this.refTeacher}>
                    <CPanel title="私塾导师" className="bg-blue">
                        <CCardContainer layout="245">
                            <TeacherList
                                list={teacherList}
                                isMentor={isMentor}
                            />
                        </CCardContainer>
                    </CPanel>
                </div>

                <div ref={this.refComment}>
                    <CPanel title="口碑好评">
                        <CommentList comments={commentList} layout="123" />
                    </CPanel>
                </div>

                <div ref={this.refArticle}>
                    <CPanel title="精彩文章" className="">
                        <CCardContainer layout="112">
                            <ArticleList list={articleList} hover="darken" />
                        </CCardContainer>
                    </CPanel>
                </div>

                <div ref={this.refResource}>
                    <CPanel title="资料下载" />
                </div>
            </React.Fragment>
        );
    }
}
