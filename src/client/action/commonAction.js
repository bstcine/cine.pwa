// import * as actType from '@/constant/actionType';
import { fetchData } from '@/service/base';
// import { APIURL_User_Info } from '../../APIConfig';

// export const fetchUserInfo = () => async (dispatch, getState) => {
//     if (getState().userRedu.loading) return;
//     dispatch({ type: actType.REQUEST_USER_INFO });
//     const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
//     if (user) dispatch({ type: actType.RECEIVE_USER_INFO, payload: user });
// };

// export const fetchDataWithLoading = (url, query, _config) => async dispatch => {
//     return null;
// };
import gAction from '@/g/action';

export const superFetchDataWithShowLogin = (
    url,
    query,
    _config
) => async dispatch => {
    let config = Object.assign({ showLoading: true, showError: true }, _config);
    let timer = null;
    if (config.showLoading) {
        // 不在第一时间出现 loading，延迟 1s 之后出现
        timer = setTimeout(() => {
            dispatch(gAction.showLoading());
        }, 1000);
    }
    let [error, result] = await fetchData(url, query);
    if (config.showLoading) {
        timer && clearTimeout(timer);
        dispatch(gAction.hideLoading());
    }

    if (config.showError) dispatch(gAction.showMessage({ error }));

    return [error, result];
};
