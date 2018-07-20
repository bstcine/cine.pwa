import * as actionType from '../constant';

const gAction = {
    hideAlert: () => ({ type: actionType.HIDE_ALERT }),
    showAlert: ({ title, text, onConfirm, onCancel }) => ({
        type: actionType.SHOW_ALERT,
        payload: { title, text, onConfirm, onCancel },
    }),

    hideLoading: () => ({ type: actionType.HIDE_LOADING }),
    showLoading: () => ({ type: actionType.SHOW_LOADING }),

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

    fetchUserInfo: () => async (dispatch, getState) => {
        if (getState().userRedu.loading) return;
        dispatch({ type: actType.REQUEST_USER_INFO });
        const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
        if (user) dispatch({ type: actType.RECEIVE_USER_INFO, payload: user });
    },
};

export default gAction;
