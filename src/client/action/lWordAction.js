import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LV } from '@/constant/actionTypeLearn';
import gAction from '@/g/action';
import errorMsg from '@/util/errorMsg';

export const lWordAction = {
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
            console.log(result);
            dispatch(lWordAction._receive(result));
            dispatch(lWordAction._changeTaskStatus(result));
        }
    },
};
