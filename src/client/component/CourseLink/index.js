import React, {Component} from 'react';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';
import routeUtil from "@/util/routeUtil";

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
        routeUtil.goCourse(course, history)
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
