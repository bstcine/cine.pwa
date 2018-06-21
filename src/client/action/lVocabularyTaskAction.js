import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LV } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

export const actionVocabularyTask = {

    _request: () => ({
        type : ACTION_LV.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LV.RECEIVE,
        payload: result.rows,
    }),

    loadVocabulary: (taskId,startIndex,endIndex,wordType) => async dispatch => {

        // 使用真实的api请求获取数据
        let param = {
            task_id : taskId,
            start_index : startIndex,
            end_index : endIndex,
            word_type : wordType,
        };

        let [,result] = await fetchData(Api.APIURL_User_Learn_Word,param);

        dispatch(actionVocabularyTask._receive(result));
    },

};