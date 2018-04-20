/**
 * Created by joe on 4/16/18.
 */
import Api from "../../APIConfig";
import {fetchData} from "@/service/base";
import {Action_UI, Action_UC} from "@/constant/actionTypeUser";

export const actionUserInfo = {
    requestUser: () => ({
        type: Action_UI.REQUEST,
    }),
    receiveUser: (result) => ({
        type: Action_UI.RECEIVE,
        payload: result,
    }),
    loadUserInfo: () => async dispatch => {
        dispatch(actionUserInfo.requestUser())

        let [err, result] = await fetchData(Api.APIURL_User_Info)
        dispatch(actionUserInfo.receiveUser(result));
    }
}

export const actionUserCoupon = {
    requestCoupon: () => ({
        type: Action_UC.REQUEST,
    }),
    receiveCoupon: (result) => ({
        type: Action_UC.RECEIVE,
        payload: result.rows
    }),
    expandCoupon: (id) => ({
        type: Action_UC.EXPAND,
        id: id
    }),
    loadUserCoupon: () => async dispatch => {
        dispatch(actionUserCoupon.requestCoupon())

        let param = {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'}
        let [err, result] = await fetchData(Api.APIURL_User_Coupon, param)
        dispatch(actionUserCoupon.receiveCoupon(result))
    }
}