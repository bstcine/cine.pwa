/**
 * Created by joe on 4/16/18.
 */
import Api from "../../APIConfig";
import {fetchData} from "@/service/base";
import {Action_UI, Action_UC} from "@/constant/actionType";

const requestUser = () => ({
    type: Action_UI.REQUEST,
})
const receiveUser = (result) => ({
    type: Action_UI.RECEIVE,
    payload: result,
})
export const loadUserInfo = () => async dispatch => {
    dispatch(requestUser())

    let [err, result] = await fetchData(Api.APIURL_User_Info)
    dispatch(receiveUser(result));
}

const requestCoupon = () => ({
    type: Action_UC.REQUEST,
})
const receiveCoupon = (result) => ({
    type: Action_UC.RECEIVE,
    payload: result.rows
})

export const expandCoupon = (id) => ({
    type: Action_UC.EXPAND,
    id: id
})

export const loadUserCoupon = () => async dispatch => {
    dispatch(requestCoupon())

    let param = {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'}
    let [err, result] = await fetchData(Api.APIURL_User_Coupon, param)
    dispatch(receiveCoupon(result))
}