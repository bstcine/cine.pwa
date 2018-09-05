import * as actionType from '../constant';
import { APIURL_User_Info } from '@/../APIConfig';
import { fetchData } from '@/service/base';
import storeUtil from '@/util/storeUtil';

const action = {
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
};

export default action;
