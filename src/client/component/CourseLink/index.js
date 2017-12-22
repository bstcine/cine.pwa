import React, {Component} from 'react';
import * as storeUtil from "@/util/storeUtil";
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";

export default class CourseLink extends Component {

    constructor(props) {
        super(props);
        this.clickCourseLink = this.clickCourseLink.bind(this);
    }

    clickCourseLink() {
        const {course, history} = this.props;
        const course_id = course.id;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.CINE_IOS
            || sitecode === SITECODE.CINE_IOS_IPHONE
            || sitecode === SITECODE.CINE_IOS_IPAD) {
            Bridge.ios('course', {course_id}, false)
        } else if (sitecode === SITECODE.CINE_ANDROID
            || sitecode === SITECODE.CINE_ANDROID_PHONE
            || sitecode === SITECODE.CINE_ANDROID_PAD) {
            Bridge.android('course', {course_id}, false)
        } else {
            if (/^\/content\//i.test(location.pathname)) {
                history.push(`/course?cid=${course_id}`)
            } else {
                location.href = `/content/course?cid=${course_id}`
            }
        }
    }

    render() {
        return (
            <div onClick={this.clickCourseLink}>
                {this.props.children}
            </div>
        );
    }
}