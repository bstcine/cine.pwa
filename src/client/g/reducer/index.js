import * as actionType from '../constant';

export const userRedu = (state = { loading: false, data: null }, action) => {
    switch (action.type) {
        case actionType.REQUEST_USER_INFO:
            return { loading: true, ...state };
        case actionType.RECEIVE_USER_INFO:
            return { loading: false, data: action.payload };
        default:
            return state;
    }
};

export const alertRedu = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case actionType.HIDE_ALERT:
            return { isOpen: false };
        case actionType.SHOW_ALERT: {
            const { title, text, onCancel, onConfirm } = action.payload;
            return {
                isOpen: true,
                title,
                text,
                onCancel,
                onConfirm,
            };
        }
        default:
            return state;
    }
};

export const loadingRedu = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case actionType.HIDE_LOADING:
            return { isOpen: false };
        case actionType.SHOW_LOADING:
            return { isOpen: true };
        default:
            return state;
    }
};

export const messageRedu = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case actionType.HIDE_MESSAGE:
            return { isOpen: false };
        case actionType.SHOW_MESSAGE: {
            const { text, error } = action.payload;
            return {
                isOpen: true,
                text,
                error,
            };
        }
        default:
            return state;
    }
};
