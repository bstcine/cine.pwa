import React, {Component} from 'react';
import * as storeUtil from "@/util/storeUtil";
import Bridge from "@/util/bridge";
import SITECODE from "@/constant/sitecode";
import BRIDGE_EVENT from '@/constant/bridgeEvent'

export default class CourseLink extends Component {

    constructor(props) {
        super(props);
        this.clickCourseLink = this.clickCourseLink.bind(this);
    }

    clickCourseLink() {
        const {course, history} = this.props;
        if(course.status!=='1') return
        const course_id = course.id;
        let sitecode = storeUtil.get('sitecode');
        if (sitecode === SITECODE.IOS
            || sitecode === SITECODE.IOS_IPHONE
            || sitecode === SITECODE.IOS_IPAD) {
            Bridge.ios(BRIDGE_EVENT.COURSE, {course_id}, false)
        } else if (sitecode === SITECODE.ANDROID
            || sitecode === SITECODE.ANDROID_PHONE
            || sitecode === SITECODE.ANDROID_PAD) {
            Bridge.android(BRIDGE_EVENT.COURSE, {course_id}, false)
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