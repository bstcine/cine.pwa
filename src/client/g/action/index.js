import * as actionType from '../constant';
import { APIURL_User_Info } from '@/../APIConfig';
import { fetchData } from '@/service/base';
import storeUtil from '@/util/storeUtil';

const action = {
    _hideAlert: () => ({ type: actionType.HIDE_ALERT }),
    _showAlert: ({ title, text, isShowCancel, onConfirm, onCancel }) => ({
        type: actionType.SHOW_ALERT,
        payload: { title, text, isShowCancel, onConfirm, onCancel },
    }),
    showAlert: ({ title, text, onConfirm, onCancel }) => dispatch => {
        dispatch(
            action._showAlert({
                title,
                text,
                isShowCancel: !!onConfirm,
                onConfirm: () => {
                    dispatch(action._hideAlert());
                    onConfirm && onConfirm();
                },
                onCancel: () => {
                    dispatch(action._hideAlert());
                    onCancel && onCancel();
                },
            })
        );
    },

    hideLoading: () => ({ type: actionType.HIDE_LOADING }),
    showLoading: () => ({ type: actionType.SHOW_LOADING }),

    _hideMessage: () => ({ type: actionType.HIDE_MESSAGE }),
    _showMessage: ({ text, error }) => ({
        type: actionType.SHOW_MESSAGE,
        payload: { text, error },
    }),
    showMessage: ({ text, error }, autoHide = true) => dispatch => {
        if (autoHide) {
            setTimeout(() => {
                dispatch(action._hideMessage());
            }, 3000);
        }
        dispatch(action._showMessage({ text, error }));
    },

    preFetchUserInfo: () => dispatch => {
        if (!storeUtil.getToken()) return;
        dispatch(action.fetchUserInfo());
    },

    fetchUserInfo: () => async (dispatch, getState) => {
        if (getState().userRedu.loading) return;
        dispatch({ type: actionType.REQUEST_USER_INFO });
        const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
        if (user) dispatch({ type: actionType.RECEIVE_USER_INFO, payload: user });
    },

    fetchData: (url, query, _config) => async dispatch => {
        let config = Object.assign(
            { dispatchActionType: null, showLoading: true, showError: true },
            _config
        );
        let timer = null;
        if (config.showLoading) {
            // 不在第一时间出现 loading，延迟 1s 之后出现
            timer = setTimeout(() => {
                dispatch(action.showLoading());
            }, 1000);
        }
        let [error, result] = await fetchData(url, query);
        if (config.showLoading) {
            timer && clearTimeout(timer);
            dispatch(action.hideLoading());
        }

        if (config.showError) dispatch(action.showMessage({ error }));

        if (config.dispatchActionType) {
            dispatch({ type: config.dispatchActionType, payload: result });
        } else {
            return [error, result];
        }
    },
};

export default action;
