import * as actionType from '@/constant/actionType';

const gAction = {
    hideAlert: () => ({ type: actionType.HIDE_ALERT }),
    showAlert: ({ title, text, onConfirm, onCancel }) => ({
        type: actionType.SHOW_ALERT,
        payload: { title, text, onConfirm, onCancel },
    }),

    hideLoading: () => ({ type: actionType.HIDE_LOADING }),
    showLoading: () => ({ type: actionType.SHOW_LOADING }),

    hideMessage: () => ({ type: actionType.HIDE_MESSAGE }),
    showMessage: ({ text, error }) => ({
        type: actionType.SHOW_MESSAGE,
        payload: { text, error },
    }),
};

export default gAction;
