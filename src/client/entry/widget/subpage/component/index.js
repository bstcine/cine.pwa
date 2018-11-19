import React from 'react';
import { CPanel } from '@/component/_base';
import { SideBarSubPage } from '@/component/SideBar/SubPage';
import CardExList from './CardList';
import CommentList from './CommentList';

export default class SubPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRightDrawerOpen: false,
        };
        this.onChange = this.onChange.bind(this);
        this.ref = React.createRef();
    }

    onChange(sb_value) {
        let nav = this.ref.current;
        let scrollY = 0;
        switch (sb_value) {
            case 'course':
                break;
            case 'article':
                scrollY =
                    nav.getBoundingClientRect().top +
                    document.documentElement.scrollTop;
                window.scrollTo(0, scrollY);
                break;
            case 'teacher':
                break;
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
                <CPanel title="核心课程">
                    <CardExList
                        type="course"
                        orders={courseList}
                        layout="234"
                    />
                </CPanel>
                <CPanel title="私塾导师" className="bg-blue">
                    <CardExList
                        type="teacher"
                        orders={teacherList}
                        layout="245"
                    />
                </CPanel>
                <CPanel title="口碑好评">
                    <CommentList comments={commentList} layout="123" />
                </CPanel>
                <div ref={this.ref}>
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
