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
        this.navBox = this.ref.current;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        if (this.state.sbValue !== '' && this.isRealScroll) {
            let panelValue = this.handlePanelValue(200);
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
        this.setState({ sbValue: sb_value });

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
        // this.handlePanelDisplayForSB(ref);
        let nav = ref.current;
        if (nav) {
            let scrollY =
                nav.getBoundingClientRect().top +
                document.documentElement.scrollTop;
            window.scrollTo(0, scrollY);
        }
    }

    /*     handlePanelDisplayForSB(ref) {
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
    } */

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
