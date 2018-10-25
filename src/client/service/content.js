import { postv1 } from '@/service/request';
import Api from '@/../APIConfig';
import storeUtl from '@/util/storeUtil';

export let createCoupon = source_user_id => {
    return postv1(Api.APIURL_Create_Coupon, {
        create_by: source_user_id,
        token: storeUtl.getToken(),
    }).then(res => {
        return [res.msg, res.coupon];
    });
};
