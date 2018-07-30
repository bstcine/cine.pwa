import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LV } from '@/constant/actionTypeLearn';
// import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';
import gAction from '@/g/action';

export const lWordListAction = {
    _request: () => ({
        type: ACTION_LV.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LV.RECEIVE,
        payload: result.rows,
    }),

    _changeTaskStatus: result => ({
        type: ACTION_LV.TASKSTATUS,
        payload: result.status,
    }),

    loadVocabulary: param => async dispatch => {
        let [error, result] = await fetchData(
            Api.APIURL_User_Learn_Word,
            param
        );

        if (error) {
            dispatch(gAction.showMessage({ error: errorMsg(error) }));
        } else {
            // console.log(result);
            dispatch(lWordListAction._receive(result));
            dispatch(lWordListAction._changeTaskStatus(result));
        }
    },
};
