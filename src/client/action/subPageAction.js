import * as actionType from '../constant/actionType';
import * as sub from '@/service/data/response_subpage.json';

const subPageAction = {
    _receive: data => ({
        type: actionType.Http_Receive,
        payload: data,
    }),

    initData: type => async (dispatch, getState) => {
        alert("subPageAction - initData -" + JSON.stringify(type));
        dispatch(subPageAction._receive(sub.result));
    },
};

export default subPageAction;
