import {
    CLOSE_TIP_MODAL,
    OPEN_TIP_MODAL,
    CLOSE_CONFIRM_MODAL,
    OPEN_CONFIRM_MODAL,
    OPEN_NETWORK_ERROR,
    CLOSE_NETWORK_ERROR,
} from '@/constant/actionTypeCommon';

export const closeTipModal = () => ({
    type: CLOSE_TIP_MODAL,
});

export const openTipModal = ({ text }) => ({
    type: OPEN_TIP_MODAL,
    payload: { text },
});

export const closeConfirmModal = () => ({
    type: CLOSE_CONFIRM_MODAL,
});

export const openConfirmModal = ({ text, onConfirm, onCancel }) => ({
    type: OPEN_CONFIRM_MODAL,
    payload: { text, onConfirm, onCancel },
});

export const networkError = err => dispatch => {
    let text = err instanceof Error ? err.message : err;
    dispatch({
        type: OPEN_NETWORK_ERROR,
        payload: { text },
    });
    setTimeout(() => {
        dispatch({
            type: CLOSE_NETWORK_ERROR,
            payload: { text },
        });
    }, 3000);
};
