import {post, postv1} from '@/service/request';
import Api from '@/../APIConfig';
import storeUtl from '@/util/storeUtil';
import errorCode from '@/constant/errorCode';
import errorMsg from '@/util/errorMsg';

export let getContentCourseDetail = query => {
    return post(Api.APIURL_Content_Course_Detail, query).then(res => {
        if (res.except_case_desc) {
            return alert(res.except_case_desc);
        }
        return res.result.detail;
    });
};

export let getContentHome = query => {
    if (window.navigator.onLine) {
        return post(Api.APIURL_Content_Home, query).then(res => {
            if (res.except_case_desc) {
                return alert(res.except_case_desc);
            }
            let homeRes = res.result;
            storeUtl.set(Api.APIURL_Content_Home, homeRes);
            return storeUtl.get(Api.APIURL_Content_Home);
        });
    } else {
        let homeRes = storeUtl.get(Api.APIURL_Content_Home);
        if (!homeRes) {
            return alert('网络异常，无缓存数据');
        }
        return homeRes;
    }
};

export let getContentCourseComment = query => {
    return post(Api.APIURL_Content_Course_Comment, query).then(res => {
        if (res.except_case_desc) {
            return alert(errorMsg(res.except_case_desc));
        }
        return res.result;
    });
};

export let createCoupon = source_user_id => {
    return postv1(Api.APIURL_Create_Coupon, {source_user_id, token: storeUtl.getToken()}).then(res => {
        if (!res.status) {
            return alert(errorMsg(res.msg));
        }
        return res.coupon;
    });
};

export let prepareOrder = ({cid}) => {
    return post(Api.APIURL_Order_Prepare, {cid}).then(res => {
        if (res.except_case_desc) {
            return alert(errorMsg(res.except_case_desc));
        }
        return res.result;
    });
};

export let createOrder = ({cid, point, coupon_no, remark}) => {
    return post(Api.APIURL_Order_Create, {cid, point, coupon_no, remark});
};

export let preCalculatePrice = ({cid, point, coupon_no}) => {
    return post(Api.APIURL_Order_PreCalculatePrice, {cid, point, coupon_no});
};
