import * as actionType from '../constant';
import { APIURL_User_Info } from '@/../APIConfig';
import { fetchData } from '@/service/base';
import storeUtil from '@/util/storeUtil';
import { CAlert } from '@/component/_base';

const cardAction = {
    showDetail: (item) => dispatch => {
        // alert(JSON.stringify(item))
        CAlert.open({text:JSON.stringify(item) });
  /*       if (!storeUtil.getToken()) return;
        dispatch(cardAction.fetchUserInfo()); */
    },

    changeFavoriteStatus: (item) => async (dispatch, getState) => {
        alert(JSON.stringify(item))
        // CAlert.open({text:JSON.stringify(item) });
        /* if (getState().userRedu.loading) return;
        dispatch({ type: actionType.REQUEST_USER_INFO });

        const [, user] = await fetchData(APIURL_User_Info, null, 'GET');
        if (user)
            dispatch({ type: actionType.RECEIVE_USER_INFO, payload: user }); */
    },
};

export default cardAction;