import React from 'react';
import { CPanel } from '@/component/_base';
import { SideBarSubPage } from '@/component/SideBar/SubPage';
import CardExList from './CardList';
import CommentList from './CommentList';

export default class SubPage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.ref = React.createRef();
        this.refTeacher = React.createRef();
        this.refComment = React.createRef();
        this.refArticle = React.createRef();
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
        }
    }

    onScroll(ref) {
        let nav = ref.current;
        if (nav) {
            let scrollY =
                nav.getBoundingClientRect().top +
                document.documentElement.scrollTop;
            window.scrollTo(0, scrollY);
        }
    }

    render() {
        const { courses, teachers, articles, comments, actions } = this.props;
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
                        <CardExList
                            type="course"
                            orders={courseList}
                            layout="234"
                        />
                    </CPanel>
                </div>

                <div ref={this.refTeacher}>
                    <CPanel title="私塾导师" className="bg-blue">
                        <CardExList
                            type="teacher"
                            orders={teacherList}
                            layout="245"
                        />
                    </CPanel>
                </div>

                <div ref={this.refComment}>
                    <CPanel title="口碑好评">
                        <CommentList comments={commentList} layout="123" />
                    </CPanel>
                </div>

                <div ref={this.refArticle}>
                    <CPanel title="精彩文章" className="bg-blue">
                        <CardExList
                            type="article"
                            orders={articleList}
                            layout="112"
                        />
                    </CPanel>
                </div>
            </React.Fragment>
        );
    }
}
