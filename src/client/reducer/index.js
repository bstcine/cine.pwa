import {
    CLOSE_ALERT,
    OPEN_ALERT,
    CLOSE_CONFIRM,
    OPEN_CONFIRM,
} from '@/constant/actionTypeCommon';

export const alertModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_ALERT:
            return { isOpen: false };
        case OPEN_ALERT:
            return { isOpen: true, text: payload.text };
        default:
            return state;
    }
};

export const confirmModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_CONFIRM:
            return { isOpen: false };
        case OPEN_CONFIRM: {
            let { text, onConfirm, onCancel } = payload;
            return { isOpen: true, text, onConfirm, onCancel };
        }
        default:
            return state;
    }
};
