/**
 * Created by joe on 4/16/18.
 */
import Api from "../../APIConfig";
import {fetchData} from "@/service/base";
import {Action_UI_RECEIVE, Action_UI_REQUEST, Action_UC_RECEIVE, Action_UC_REQUEST} from "@/constant/actionType";

const requestUser = () => ({
    type: Action_UI_REQUEST,
})
const receiveUser = (result) => ({
    type: Action_UI_RECEIVE,
    payload: result,
})
export const loadUserInfo = () => async dispatch => {
    dispatch(requestUser())

    let [err,result] = await fetchData(Api.APIURL_User_Info)
    dispatch(receiveUser(result));
}

const requestCoupon = () => ({
    type: Action_UC_REQUEST,
})
const receiveCoupon = (result) => ({
    type: Action_UC_RECEIVE,
    payload: result.rows
})
export const loadUserCoupon = () => async dispatch => {
    dispatch(requestCoupon())

    let param = {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'}
    let [err,result] = await fetchData(Api.APIURL_User_Coupon, param)
    dispatch(receiveCoupon(result))
}