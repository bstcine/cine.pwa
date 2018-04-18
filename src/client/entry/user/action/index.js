import Api from "../../../../APIConfig";
import {fetchData} from "@/service/base";

export const USER_REQUEST = 'USER_REQUEST';
export const USER_RECEIVE = 'USER_RECEIVE';

const requestUser = () => ({
    type: USER_REQUEST,
})
const receiveUser = (result) => ({
    type: USER_RECEIVE,
    payload: result,
})
export const loadUserInfo = () => dispatch => {
    dispatch(requestUser())
    return fetchData(Api.APIURL_User_Info, {})
        .then(([err, result]) => {
            if (err) return Promise.resolve();
            return dispatch(receiveUser(result));
        })
}

export const COUPON_REQUEST = 'COUPON_REQUEST';
export const COUPON_RECEIVE = 'COUPON_RECEIVE';

const requestCoupon = () => ({
    type: COUPON_REQUEST,
})
const receiveCoupon = (result) => ({
    type: COUPON_RECEIVE,
    payload: result.rows
})
export const postCoupon = () => dispatch => {
    dispatch(requestCoupon())
    return fetchData(Api.APIURL_User_Coupon, {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'})
        .then(([err, result]) => {
            if (err) return Promise.resolve();
            return dispatch(receiveCoupon(result));
        })
}