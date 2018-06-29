/**
 * Created by lidangkun on 2018/6/15.
 */
import { fromJS } from 'immutable';
import { ACTION_LT } from '@/constant/actionTypeLearn';

const initialState = fromJS({
    isTest: false,                   // 是否正在测试
    rows: [],                        // 任务源数据
    wordCount: 0,                    // 单词总数
    faileTempIndexArr: null,         // 选择错误的单词临时下标
    faileIndexArr: null,             // 选择错误的单词下标集合
    faileIndex: -1,                  // 正在使用的错误下标数组的下标
    correctCount: 0,                 // 已掌握单词数量
    selectIndex: -1,                 // 选中下标 ,-1尚未选择
    content: {                       // 显示内容对象
        index: -1,                   // 当前单词下标
        value: 'wordTest',           // 当前单词
        real_zh: -1,                 // 正确的翻译下标（0，1，2，3）
        zh: [],                      // 所有翻译内容数组
    },
    param: {                         // api访问参数
        start_index: null,
        end_index: null,
        word_type: null,
    }
});

const WordQuizRedu = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LT.SAVEPARAM:
            return state.set('param', action.payload);
        case ACTION_LT.REQUEST:
            return state;
        case ACTION_LT.RECEIVE:
            return state.set('rows', action.payload);
        case ACTION_LT.CHANGEWORDCOUNT:
            return state.set('wordCount', action.payload);
        case ACTION_LT.STARTTEST:
            return state.set('isTest', action.payload);
        case ACTION_LT.CHANGECONTENT:
            return state.set('content', action.payload);
        case ACTION_LT.CORRECTCOUNT:
            return state.set('correctCount', action.payload);
        case ACTION_LT.CHANGESELECTSTATUS:
            return state.set('selectIndex', action.payload);
        case ACTION_LT.CHANGEFAILEINDEX:
            return state.set('faileIndex', action.payload);
        case ACTION_LT.CHANGEFAILEINDEXARRAY:
            return state.set('faileIndexArr', action.payload);
        case ACTION_LT.CHANGEFAILETEMPINDEXARRAY:
            return state.set('faileTempIndexArr', action.payload);
        default:
            return state;
    }
};

export default WordQuizRedu;