import {
    CLOSE_ALERT,
    OPEN_ALERT,
    CLOSE_CONFIRM,
    OPEN_CONFIRM,
    OPEN_NETWORK_ERROR,
    CLOSE_NETWORK_ERROR,
} from '@/constant/actionTypeCommon';

export const closeAlert = () => ({
    type: CLOSE_ALERT,
});

export const openAlert = ({ text }) => ({
    type: OPEN_ALERT,
    payload: { text },
});

export const closeConfirm = () => ({
    type: CLOSE_CONFIRM,
});

export const openConfirm = ({ text, onConfirm, onCancel }) => ({
    type: OPEN_CONFIRM,
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
