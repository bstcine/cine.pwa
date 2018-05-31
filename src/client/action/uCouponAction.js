import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { Action_UC } from '@/constant/actionTypeUser';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

const toastTimeout = 2000;
export const actionUserCoupon = {
    request: () => ({
        type: Action_UC.REQUEST,
    }),
    receive: result => ({
        type: Action_UC.RECEIVE,
        payload: result.rows,
    }),

    _hideToast: () => ({
        type: Action_UC.TOAST_HIDE,
    }),

    _expandCouponItem: coupons => ({
        type: Action_UC.EXPAND,
        payload: coupons,
    }),

    _toggleCouponDialog: isOpen => ({
        type: Action_UC.TOGGLE_DIALOG,
        payload: isOpen,
    }),

    loadUserCoupon: () => async dispatch => {
        dispatch(actionUserCoupon.request());

        let param = {
            page: 1,
            pageSize: 500,
            orderBy: 'create_at',
            orderValue: 'desc',
        };
        let [, result] = await fetchData(Api.APIURL_User_Coupon, param);

        dispatch(actionUserCoupon.receive(result));
    },

    toggleCouponDialog: isOpen => (dispatch, getState) => {
        let willOpen = !getState().couponRedu.get('isOpen');
        dispatch(actionUserCoupon._toggleCouponDialog(willOpen));
    },

    toggleCouponTransfer: coupon => (dispatch, getState) => {
        alert(JSON.stringify(coupon));
    },

    expandCouponItem: id => (dispatch, getState) => {
        let coupons = getState().couponRedu.get('rows');
        let newCoupons = coupons.map(item => ({
            ...item,
            expand: item.id === id ? !item.expand : item.expand,
        }));

        dispatch(actionUserCoupon._expandCouponItem(newCoupons));
    },

    addCoupon: no => async dispatch => {
        if (no.trim().length !== 0) {
            // dispatch(toastAction.loading());
            let [err, result] = await fetchData(Api.APIURL_User_Coupon_Add, {
                no,
            });

            if (err) {
                err = errorMsg(err);
                dispatch(toastAction.showError(err));
            } else {
                dispatch(toastAction.show('添加成功'));
                dispatch(actionUserCoupon._toggleCouponDialog(false));
                dispatch(actionUserCoupon.loadUserCoupon());
            }
        } else {
            let error = '请输入优惠码！';
            dispatch(toastAction.showError(error));
        }

        /*     setTimeout(() => {
            dispatch(toastAction.hide());
        }, toastTimeout); */
    },

    transferCoupon: transferUser => async dispatch => {
        alert(JSON.stringify(transferUser));
    },
};
