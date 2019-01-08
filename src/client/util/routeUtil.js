import Bridge from '@/util/_base/interBridge';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import BRIDGE_EVENT from '@/constant/bridgeEvent';

let routeUtil = {
    goCourse: ({ id, status }, history) => {
        if (status && status !== '1') return;
        const course_id = id;
        if (interSiteCodeUtil.inIOSAPP()) {
            Bridge.ios(BRIDGE_EVENT.COURSE, { course_id });
        } else if (interSiteCodeUtil.inAndroidAPP()) {
            Bridge.android(BRIDGE_EVENT.COURSE, { course_id });
        } else {
            if (/^\/content/i.test(location.pathname) && history) {
                history.push(`/content/course?cid=${course_id}`);
            } else {
                location.href = `/content/course?cid=${course_id}`;
            }
        }
    },
};

export default routeUtil;
