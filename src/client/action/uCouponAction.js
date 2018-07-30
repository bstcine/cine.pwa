import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { Action_UC } from '@/constant/actionTypeUser';
// import { toastAction } from '@/action/commonAction';
import gAction from '@/g/action';
import errorMsg from '@/util/errorMsg';

export const actionUserCoupon = {
    request: () => ({
        type: Action_UC.REQUEST,
    }),
    receive: result => ({
        type: Action_UC.RECEIVE,
        payload: result.rows,
    }),

    _expandCouponItem: coupons => ({
        type: Action_UC.EXPAND,
        payload: coupons,
    }),

    _toggleCouponDialog: isOpen => ({
        type: Action_UC.TOGGLE_DIALOG,
        payload: isOpen,
    }),

    _toggleTransferDialog: transfer => ({
        type: Action_UC.TOGGLE_TRANSFER_DIALOG,
        payload: transfer,
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
        let willOpen = !getState().couponRedu.get('isOpenAdd');
        dispatch(actionUserCoupon._toggleCouponDialog(willOpen));
        // dispatch(
        //     gAction.showAlert({
        //         text: '12331',
        //         onCancel: () => {
        //             alert('onCancel');
        //         },
        //         onConfirm: () => {
        //             alert('onConfirm');
        //         },
        //     })
        // );
    },

    initTransferDialog: coupon => (dispatch, getState) => {
        let transfer = {
            isOpen: true,
            isCheck: true,
            coupon: coupon,
            checkMessage: '',
            userAccount: '',
        };
        dispatch(actionUserCoupon._toggleTransferDialog(transfer));
    },

    toggleTransferDialog: () => (dispatch, getState) => {
        let transfer = getState().couponRedu.get('transfer');

        let newTransfer = {
            isOpen: !transfer.isOpen,
            isCheck: transfer.isCheck,
            coupon: transfer.coupon,
            checkMessage: transfer.checkMessage,
            userAccount: transfer.userAccount,
        };
        dispatch(actionUserCoupon._toggleTransferDialog(newTransfer));
    },
    toggleTransferCheck: (isCheck, checkMessage, userAccount) => (
        dispatch,
        getState
    ) => {
        let transfer = getState().couponRedu.get('transfer');

        let newTransfer = {
            isOpen: transfer.isOpen,
            isCheck: isCheck,
            coupon: transfer.coupon,
            checkMessage: checkMessage,
            userAccount: userAccount,
        };

        dispatch(actionUserCoupon._toggleTransferDialog(newTransfer));
    },
    toggleTransferCheckStatus: account => async (dispatch, getState) => {
        // 需要检查输入的值
        if (account === '') {
            dispatch(gAction.showMessage({ error: '请输入对方账号' }));
            return;
        }

        let param = {
            query: account,
        };

        // 调用输入的账户
        let [err, result] = await fetchData(Api.APIURL_User_Query, param);

        if (err) {
            err = errorMsg(err);
            dispatch(gAction.showMessage({ error: err }));
            return;
        }

        let isCheck = true;
        let checkMessage = '';

        if (result.length < 1) {
            checkMessage = '没有查询到指定的用户';
        } else if (result.length === 1) {
            isCheck = false;
            checkMessage = '已查询到指定的用户: ' + result[0].phone;
            account = result[0].id;
        } else {
            checkMessage =
                '查询到' + result.length + '个用户，请指定更详细的信息';
        }

        dispatch(
            actionUserCoupon.toggleTransferCheck(isCheck, checkMessage, account)
        );
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
            let [err] = await fetchData(Api.APIURL_User_Coupon_Add, {
                no,
            });

            if (err) {
                err = errorMsg(err);
                dispatch(gAction.showMessage({ error: err }));
            } else {
                dispatch(gAction.showMessage({ text: '添加成功' }));
                dispatch(actionUserCoupon._toggleCouponDialog(false));

                dispatch(actionUserCoupon.loadUserCoupon());
            }
        } else {
            dispatch(gAction.showMessage({ error: '请输入优惠码' }));
        }
    },

    transferCoupon: transferUser => async (dispatch, getState) => {
        // 开始转增优惠券
        let transfer = getState().couponRedu.get('transfer');

        let param = {
            transfer: transferUser,
            coupon_no: transfer.coupon.no,
        };

        let [err, result] = await fetchData(
            Api.APIURL_User_Coupon_Transfer,
            param
        );

        if (err) {
            err = errorMsg(err);
            dispatch(gAction.showMessage({ error: err }));
            return;
        }

        if (result === '0') {
            dispatch(gAction.showMessage({ error: '转赠失败' }));
            return;
        }

        dispatch(gAction.showMessage({ text: '转赠成功' }));
        dispatch(actionUserCoupon.toggleTransferDialog());
        dispatch(actionUserCoupon.loadUserCoupon());
    },
};
