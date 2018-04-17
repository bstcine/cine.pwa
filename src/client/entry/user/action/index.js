import Api from "../../../../APIConfig";
import {fetchData} from "@/service/base";

export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REQUEST_COUPON = 'REQUEST_COUPON';
export const RECEIVE_COUPON = 'RECEIVE_COUPON';

const requestUser = () => ({
    type: REQUEST_USER,
})
const receiveUser = (result) => ({
    type: RECEIVE_USER,
    result: result,
})
export const postUserInfo = () => dispatch => {
    dispatch(requestUser())
    return fetchData(Api.APIURL_User_Info, {})
        .then(([err, result]) => {
            if (err) return Promise.resolve();
            return dispatch(receiveUser(result));
        })
}

const requestCoupon = () => ({
    type: REQUEST_COUPON,
})
const receiveCoupon = (use,userd,expired) => ({
    type: RECEIVE_COUPON,
    use: use,
    used:userd,
    expired:expired
})
export const postCoupon = () => dispatch => {
    dispatch(requestCoupon())
    return fetchData(Api.APIURL_User_Coupon, {page:1,pageSize:1000000,orderBy:'create_at',orderValue:'desc'})
        .then(([err, result]) => {
            if (err) return Promise.resolve();

            let rows = result.rows;

            let use = rows.filter(item => item.status === '0');
            let used = rows.filter(item => item.status === '1');
            let expired = rows.filter(item => item.status === '2');

            return dispatch(receiveCoupon(use,used,expired));
        })
}