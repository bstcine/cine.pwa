import Bridge from '@/util/bridge';
import siteCodeUtil from '@/util/sitecodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

let routeUtil = {
    goCourse: ({id,status}, history) => {
        if (status && status !== '1') return;
        const course_id = id;
        if (siteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.COURSE, {course_id});
        } else if (siteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.COURSE, {course_id});
        } else {
            if (/^\/content/i.test(location.pathname) && history) {
                history.push(`/content/course?cid=${course_id}`);
            } else {
                location.href = `/content/course?cid=${course_id}`;
            }
        }
    }
};

export default routeUtil;
