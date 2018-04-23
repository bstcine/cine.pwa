/**
 * Created by joe on 4/16/18.
 */
import Api from "../../APIConfig";
import {fetchData} from "@/service/base";
import {Action_UI, Action_UC, Action_UP} from "@/constant/actionTypeUser";

export const actionUserInfo = {
    request: () => ({
        type: Action_UI.REQUEST,
    }),
    receive: (result) => ({
        type: Action_UI.RECEIVE,
        payload: result,
    }),
    loadUserInfo: () => async dispatch => {
        dispatch(actionUserInfo.request())

        let [err, result] = await fetchData(Api.APIURL_User_Info)
        dispatch(actionUserInfo.receive(result));
    }
}

export const actionUserCoupon = {
    request: () => ({
        type: Action_UC.REQUEST,
    }),
    receive: (result) => ({
        type: Action_UC.RECEIVE,
        payload: result.rows
    }),
    expandCoupon: (id) => ({
        type: Action_UC.EXPAND,
        id: id
    }),
    loadUserCoupon: () => async dispatch => {
        dispatch(actionUserCoupon.request())

        let param = {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'}
        let [err, result] = await fetchData(Api.APIURL_User_Coupon, param)
        dispatch(actionUserCoupon.receive(result))
    }
}

export const actionUserPoint = {
    request: () => ({
        type: Action_UP.REQUEST,
    }),
    receive: (result) => ({
        type: Action_UP.RECEIVE,
        payload: result.rows
    }),
    loadUserPoint: () => async dispatch => {
        dispatch(actionUserPoint.request())

        let param = {page: 1, pageSize: 1000000, orderBy: 'create_at', orderValue: 'desc'}
        let [err, result] = await fetchData(Api.APIURL_User_Point, param)
        dispatch(actionUserPoint.receive(result))
    }
}