import React from 'react';
import { SideBarSubPage } from '@/component/SideBar/SubPage';
import './../../asset/style/index.less';
import PCourse from './PCourse';
import PComment from './PComment';
import PResource from './PResource';
import PArticle from './PArticle';
import PTeacher from './PTeacher';

export default class SubPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sbValue: 'course',
        };
        this.isRealScroll = true;
        this.scrollValue = '';
        this.ref = React.createRef();
        this.refTeacher = React.createRef();
        this.refComment = React.createRef();
        this.refArticle = React.createRef();
        this.refResource = React.createRef();
        this.onChangeFromSB = this.onChangeFromSB.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (this.state.sbValue !== '' && this.isRealScroll) {
            let centerY = document.documentElement.clientHeight / 2;
            let panelValue = this.handlePanelValue(centerY);
            if (panelValue !== this.scrollValue && panelValue !== '') {
                this.scrollValue = panelValue;
                this.setState({ sbValue: this.scrollValue });
                // alert(this.scrollValue);
            }
        }

        if (!this.isRealScroll) {
            setTimeout(() => {
                this.isRealScroll = true;
            }, 500);
        }
    }

    handlePanelValue(y) {
        if (this.ref.current) {
            let p1 = this.ref.current.getBoundingClientRect();
            let p2 = this.refTeacher.current.getBoundingClientRect();
            let p3 = this.refComment.current.getBoundingClientRect();
            let p4 = this.refArticle.current.getBoundingClientRect();
            let p5 = this.refResource.current.getBoundingClientRect();

            if ((p1.top < y) & (p1.bottom > y)) {
                return 'course';
            } else if ((p2.top < y) & (p2.bottom > y)) {
                return 'teacher';
            } else if ((p3.top < y) & (p3.bottom > y)) {
                return 'comment';
            } else if ((p4.top < y) & (p4.bottom > y)) {
                return 'article';
            } else if ((p5.top < y) & (p5.bottom > y)) {
                return 'resource';
            }

            return '';
        }
    }

    onChangeFromSB(sb_value) {
        this.isRealScroll = false;
        if (this.state.sbValue !== sb_value) {
            this.setState({ sbValue: sb_value });
        }

        switch (sb_value) {
            case 'course':
                this.onScrollTo(this.ref);
                break;
            case 'teacher':
                this.onScrollTo(this.refTeacher);
                break;
            case 'comment':
                this.onScrollTo(this.refComment);
                break;
            case 'article':
                this.onScrollTo(this.refArticle);
                break;
            case 'resource':
                this.onScrollTo(this.refResource);
                break;
        }
    }

    onScrollTo(ref) {
        let nav = ref.current;
        if (nav) {
            let scrollTop =
                document.body.scrollTop >= document.documentElement.scrollTop
                    ? document.body.scrollTop
                    : document.documentElement.scrollTop;
            let scrollY = nav.getBoundingClientRect().top + scrollTop;
            window.scrollTo(0, scrollY);
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
            resources,
        } = this.props;

        const courseList = courses.toJS();
        const teacherList = teachers.toJS();
        const articleList = articles.toJS();
        const commentList = comments.toJS();
        const resourceList = resources.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <SideBarSubPage
                    isMentor={isMentor}
                    value={this.state.sbValue}
                    onChange={this.onChangeFromSB}
                />

                <div ref={this.ref}>
                    <PCourse list={courseList} isCourse={isCourse} />
                </div>

                <div ref={this.refTeacher}>
                    <PTeacher list={teacherList} isMentor={isMentor} />
                </div>

                <div ref={this.refComment}>
                    <PComment list={commentList} />
                </div>

                <div ref={this.refArticle}>
                    <PArticle list={articleList} />
                </div>

                <div ref={this.refResource}>
                    <PResource resources={resourceList} />
                </div>
            </React.Fragment>
        );
    }
}
