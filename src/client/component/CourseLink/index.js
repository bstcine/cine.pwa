import React, {Component} from 'react';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';

export default class CourseLink extends Component {
    static defaultProps = {
        className: ''
    };
    constructor(props) {
        super(props);
        this.clickCourseLink = this.clickCourseLink.bind(this);
    }

    clickCourseLink() {
        const {course, history} = this.props;
        if (course.status !== '1') return;
        const course_id = course.id;
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.COURSE, {course_id});
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.COURSE, {course_id});
        } else {
            if (/^\/content/i.test(location.pathname)) {
                history.push(`/course?cid=${course_id}`);
            } else {
                location.href = `/content/course?cid=${course_id}`;
            }
        }
    }

    render() {
        let {className, course, children} = this.props;
        if (!siteCodeUtil.inAPP()) {
            return (
                <div className={className}>
                    <a href={`/content/course?cid=${course.id}`}>{children}</a>
                </div>
            );
        } else {
            return (
                <div className={className} onClick={this.clickCourseLink}>
                    {children}
                </div>
            );
        }
    }
}
