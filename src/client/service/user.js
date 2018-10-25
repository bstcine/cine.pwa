import { post } from '@/service/request';
import Api from '@/../APIConfig';

export let queryAddress = query => {
    return post(Api.APIURL_User_Address, query)
        .then(res => {
            let result;
            if (res.result) {
                result = res.result;
            } else {
                result = {};
            }
            result.msg = res.except_case_desc;
            return result;
        })
        .catch(error => {
            console.log(error);
        });
};

export let addAddress = query => {
    return post(Api.APIURL_User_Address_Add, query)
        .then(res => {
            let result;
            if (res.result) {
                result = res.result;
            } else {
                result = {};
            }
            result.msg = res.except_case_desc;
            return result;
        })
        .catch(error => {
            console.log(error);
        });
};

export let queryCoupon = query => {
    return post(Api.APIURL_User_Coupon, query)
        .then(res => {
            let result;
            if (res.result) {
                result = res.result;
            } else {
                result = {};
            }
            result.msg = res.except_case_desc;
            return result;
        })
        .catch(error => {
            console.log(error);
        });
};
