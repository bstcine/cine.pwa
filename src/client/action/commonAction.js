// import * as actType from '@/constant/actionType';
// import { fetchData } from '@/service/base';
// import { APIURL_User_Info } from '../../APIConfig';

// export const fetchUserInfo = () => async (dispatch, getState) => {
//     if (getState().userRedu.loading) return;
//     dispatch({ type: actType.REQUEST_USER_INFO });
//     const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
//     if (user) dispatch({ type: actType.RECEIVE_USER_INFO, payload: user });
// };

export const fetchDataWithLoading = (url, query, _config) => async dispatch => {
    return null;
};
