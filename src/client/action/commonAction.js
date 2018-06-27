import * as actType from '@/constant/actionType';
import { fetchData } from '@/service/base';
import { APIURL_User_Info } from '../../APIConfig';
import storeUtil from '@/util/storeUtil';

export const closeAlert = () => ({
    type: actType.CLOSE_ALERT,
});

export const openAlert = ({ text }) => ({
    type: actType.OPEN_ALERT,
    payload: { text },
});

export const closeConfirm = () => ({
    type: actType.CLOSE_CONFIRM,
});

export const openConfirm = ({ text, onConfirm, onCancel }) => ({
    type: actType.OPEN_CONFIRM,
    payload: { text, onConfirm, onCancel },
});

export const networkError = err => dispatch => {
    let text = err instanceof Error ? err.message : err;
    dispatch({
        type: actType.OPEN_NETWORK_ERROR,
        payload: { text },
    });
    setTimeout(() => {
        dispatch({
            type: actType.CLOSE_NETWORK_ERROR,
            payload: { text },
        });
    }, 3000);
};

export const toastAction = {
    _hide: () => ({
        type: actType.TOAST_HIDE,
    }),
    _loading: () => ({
        type: actType.TOAST_LOADING,
    }),
    _show: msg => ({
        type: actType.TOAST_DISPLAY_SUCCESS,
        payload: msg,
    }),
    _showError: error => ({
        type: actType.TOAST_DISPLAY_ERROR,
        payload: error,
    }),

    hide: () => dispatch => {
        dispatch(toastAction._hide());
    },

    loading: () => dispatch => {
        dispatch(toastAction._loading());
    },

    show: msg => dispatch => {
        dispatch(toastAction._show(msg));

        setTimeout(() => {
            dispatch(toastAction._hide());
        }, 2000);
    },

    showError: error => dispatch => {
        dispatch(toastAction._showError(error));

        setTimeout(() => {
            dispatch(toastAction._hide());
        }, 2000);
    },
};

export const fetchUserInfo = () => async (dispatch, getState) => {
    if (getState().user.loading) return;
    dispatch({ type: actType.REQUEST_USER_INFO });
    const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
    if (user) dispatch({ type: actType.RECEIVE_USER_INFO, payload: user });
};
