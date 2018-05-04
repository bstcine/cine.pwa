import {
    CLOSE_TIP_MODAL,
    OPEN_TIP_MODAL,
    CLOSE_CONFIRM_MODAL,
    OPEN_CONFIRM_MODAL,
} from '@/constant/actionTypeCommon';

export const tipModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_TIP_MODAL:
            return { isOpen: false };
        case OPEN_TIP_MODAL:
            return { isOpen: true, text: payload.text };
        default:
            return state;
    }
};

export const confirmModal = (state = { isOpen: false }, { type, payload }) => {
    switch (type) {
        case CLOSE_CONFIRM_MODAL:
            return { isOpen: false };
        case OPEN_CONFIRM_MODAL: {
            let { text, onConfirm, onCancel } = payload;
            return { isOpen: true, text, onConfirm, onCancel };
        }
        default:
            return state;
    }
};
