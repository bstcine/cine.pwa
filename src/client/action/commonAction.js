/* import {
    CLOSE_ALERT,
    OPEN_ALERT,
    CLOSE_CONFIRM,
    OPEN_CONFIRM,
    OPEN_NETWORK_ERROR,
    CLOSE_NETWORK_ERROR,
} from '@/constant/actionTypeCommon'; */
import * as actType from '@/constant/actionTypeCommon';

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
