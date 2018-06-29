import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LV } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

export const lWordAction = {

    _request: () => ({
        type: ACTION_LV.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LV.RECEIVE,
        payload: result.rows,
    }),

    loadVocabulary: (startIndex, endIndex, wordType) => async dispatch => {
        let param = {};
        if (startIndex && startIndex !== 'undefined') {
            param['start_index'] = startIndex;
        }
        if (endIndex && endIndex !== 'undefined') {
            param['end_index'] = endIndex;
        }
        if (wordType && wordType !== 'undefined') {
            param['word_type'] = wordType;
        }

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (error) {
            dispatch(toastAction.showError(errorMsg(error)));
        } else {
            dispatch(lWordAction._receive(result));
        }
    },

};