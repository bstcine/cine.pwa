import * as actionType from '@/constant/actionType';

const gAction = {
    hideAlert: () => ({ type: actionType.HIDE_ALERT }),
    showAlert: ({ title, text, onConfirm, onCancel }) => ({
        type: actionType.SHOW_ALERT,
        payload: { title, text, onConfirm, onCancel },
    }),

    hideLoading: () => ({ type: actionType.HIDE_LOADING }),
    showLoading: () => dispatch => {
        setTimeout(() => {
            dispatch(gAction.hideLoading());
        }, 3000);

        dispatch({ type: actionType.SHOW_LOADING });
    },

    hideMessage: () => ({ type: actionType.HIDE_MESSAGE }),
    showMessage: ({ text, error }, autoHide = true) => dispatch => {
        if (autoHide) {
            setTimeout(() => {
                dispatch(gAction.hideMessage());
            }, 3000);
        }
        dispatch({
            type: actionType.SHOW_MESSAGE,
            payload: { text, error },
        });
    },
};

export default gAction;
