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
        case actType.TOAST_LOADING: {
            // alert('loading');
            return { loading: true, msg: '', error: '' };
        }

        case actType.TOAST_DISPLAY_SUCCESS:
            return { loading: false, msg: action.payload, error: '' };

        case actType.TOAST_DISPLAY_ERROR: {
            let toastStatus = {
                loading: false,
                msg: '',
                error: action.payload,
            };
            return toastStatus;
        }
        case actType.TOAST_HIDE:
            return { loading: false, msg: '', error: '' };

        default:
            return state;
    }
};
