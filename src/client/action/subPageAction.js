import { APIURL_Content_SubPage } from '../../APIConfig';
import * as actionType from '../constant/actionType';
import { superFetchDataWithShowLogin } from '@/action/commonAction';

const subPageAction = {
    _receive: data => ({
        type: actionType.Http_Receive,
        payload: data,
    }),

    initData: type => async (dispatch, getState) => {
        let [err, result] = await dispatch(
            superFetchDataWithShowLogin(APIURL_Content_SubPage, { page: type })
        );
        if (!err) dispatch(subPageAction._receive(result));
    },
};

export default subPageAction;
