import * as actType from '@/constant/actionType';

export const alertModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case actType.CLOSE_ALERT:
            return { isOpen: false };
        case actType.OPEN_ALERT:
            return { isOpen: true, text: payload.text };
        default:
            return state;
    }
};

export const confirmModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case actType.CLOSE_CONFIRM:
            return { isOpen: false };
        case actType.OPEN_CONFIRM: {
            let { text, onConfirm, onCancel } = payload;
            return { isOpen: true, text, onConfirm, onCancel };
        }
        default:
            return state;
    }
};

export const toastRedu = (
    state = { loading: false, msg: '', error: '' },
    action
) => {
    switch (action.type) {
        case actType.TOAST_LOADING:
            return { loading: true, msg: '', error: '' };
        case actType.TOAST_DISPLAY_SUCCESS:
            return { loading: false, msg: action.payload, error: '' };
        case actType.TOAST_DISPLAY_ERROR:
            return { loading: false, msg: '', error: action.payload };
        case actType.TOAST_HIDE:
            return { loading: false, msg: '', error: '' };
        default:
            return state;
    }
};

export const userRedu = (state = { loading: false, data: null }, action) => {
    switch (action.type) {
        case actType.REQUEST_USER_INFO:
            return { loading: true, ...state };
        case actType.RECEIVE_USER_INFO:
            return { loading: false, data: action.payload };
        default:
            return state;
    }
};

export const alertRedu = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case actType.HIDE_ALERT:
            return { isOpen: false };
        case actType.SHOW_ALERT:
            return {
                isOpen: true,
                title: payload.title,
                text: payload.text,
                onCancel: payload.onCancel,
                onConfirm: payload.onConfirm,
            };
        default:
            return state;
    }
};

export const loadingRedu = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case actType.HIDE_LOADING:
            return { isOpen: false };
        case actType.SHOW_LOADING:
            return { isOpen: true };
        default:
            return state;
    }
};

export const messageRedu = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case actType.HIDE_MESSAGE:
            return { isOpen: false };
        case actType.SHOW_MESSAGE:
            return {
                isOpen: true,
                text: action.payload.text,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
