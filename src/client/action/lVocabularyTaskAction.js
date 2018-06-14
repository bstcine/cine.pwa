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

    loadVocabulary: () => async dispatch => {
        // 生成假数据，放置于rows中
        let rows = [
            {"id":"1","word":"the","phonetic":"美[ðə]; 英[ðə]","voice":"","zh":"art. 这；那\nadv. 更加（用于比较级，最高级前）"},
            {"id":"2","word":"be","phonetic":"美[bi]; 英[bi]","voice":"","zh":"vt. 是； 有，存在； 做，成为； 发生\nn. (Be)人名；(缅)拜；(日)部(姓)；(朝)培；(中非)贝"},
            {"id":"3","word":"and","phonetic":"美[ənd]; 英[ənd]","voice":"","zh":"conj. 和，与；就；而且；但是；然后\nn. (And)人名；(土、瑞典)安德"},
            {"id":"4","word":"of","phonetic":"美[əv]; 英[əv]","voice":"","zh":"prep. 关于；属于；…的；由…组成的"},
            {"id":"5","word":"a","phonetic":"美[ə]; 英[ə]","voice":"","zh":"n. 字母A；第一流的；学业成绩达最高标准的评价符号\nabbr. [物]安（ampere）"},
        ];

        let result = {"rows":rows};
        dispatch(actionVocabularyTask._receive(result));
    },

};