/**
 * Created by joe on 4/16/18.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { Action_UI, Action_UC, Action_UP } from '@/constant/actionTypeUser';
import errorMsg from '@/util/errorMsg';

export const actionUserInfo = {
    request: () => ({
        type: Action_UI.REQUEST,
    }),
    receive: result => ({
        type: Action_UI.RECEIVE,
        payload: result,
    }),
    loadUserInfo: () => async dispatch => {
        dispatch(actionUserInfo.request());

        let [, result] = await fetchData(Api.APIURL_User_Info);
        dispatch(actionUserInfo.receive(result));
    },

    getUserInfo: function() {
        return fetchData(Api.APIURL_User_Info, {}).then(([err, result]) => {
            if (err) return Promise.resolve();
            return Promise.resolve(result);
        });
    },
};

export const actionUserCoupon = {
    request: () => ({
        type: Action_UC.REQUEST,
    }),
    receive: result => ({
        type: Action_UC.RECEIVE,
        payload: result.rows,
    }),
    expandCoupon: id => ({
        type: Action_UC.EXPAND,
        id: id,
    }),
    requestAdd: () => ({
        type: Action_UC.ADD_COUPON_START,
    }),
    receiveAdd: (err, res) => ({
        type: Action_UC.ADD_COUPON_END,
        payload: res,
        err: err,
    }),
    hideToast: () => ({
        type: Action_UC.TOAST_HIDE,
    }),
    loadUserCoupon: () => async dispatch => {
        dispatch(actionUserCoupon.request());

        let param = {
            page: 1,
            pageSize: 1000000,
            orderBy: 'create_at',
            orderValue: 'desc',
        };
        let [, result] = await fetchData(Api.APIURL_User_Coupon, param);
        dispatch(actionUserCoupon.receive(result));
    },
    toggleCouponDialog: () => ({
        type: Action_UC.TOGGLE_DIALOG,
    }),
    addCoupon: no => async dispatch => {
        dispatch(actionUserCoupon.requestAdd());
        dispatch(actionUserCoupon.toggleCouponDialog());

        let [err, result] = await fetchData(Api.APIURL_User_Coupon_Add, {
            no: no,
        });
        if (err) err = errorMsg(err);

        dispatch(actionUserCoupon.receiveAdd(err, result));

        setTimeout(() => {
            dispatch(actionUserCoupon.hideToast());
        }, 3000);

        if (!err) dispatch(actionUserCoupon.loadUserCoupon());
    },
};

export const actionUserPoint = {
    request: () => ({
        type: Action_UP.REQUEST,
    }),
    receive: (rows, remark) => ({
        type: Action_UP.RECEIVE,
        payload: { rows, remark },
    }),
    loadUserPoint: () => async dispatch => {
        dispatch(actionUserPoint.request());

        let param = {
            page: 1,
            pageSize: 300,
            orderBy: 'create_at',
            orderValue: 'desc',
        };
        let [, result] = await fetchData(Api.APIURL_User_Point, param);
        let rows = result.rows;

        let [, res] = await fetchData(Api.APIURL_Global_Integral_Rule, {
            part: '1',
            type: '1',
        });
        let remark = res.remark;

        dispatch(actionUserPoint.receive(rows, remark));
    },
};
