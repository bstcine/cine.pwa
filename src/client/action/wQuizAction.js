/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LT } from '@/constant/actionTypeLearn';
// import gAction from '@/g/action';
import errorMsg from '@/util/errorMsg';
import CommonUtil from '@/util/_base/commonUtil';
import {
    Learn_Word_Correct_SleepTime,
    Learn_Word_Failed_SleepTime,
} from '@/constant/index';
import { CMessage } from '@/component/_base';
import { uniq } from 'lodash';

const Vocabulary = {
    n: ['n.'],
    v: ['v.', 'vt.', 'vi.'],
    j: ['adj.'],
    i: ['prep.'],
    r: ['adv.'],
    p: ['pron.'],
    c: ['conj'],
    u: ['int.'],
};

function isSimilarRow(newItem, currItems) {
    let reg = /[的|地|得|“|”|；|？|。|，|\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
    let newZh = newItem.zh.slice(getType(newItem.zh).length).trim();

    let newZhArr = uniq(newZh.replace(reg, ''));
    for (let k = 0; k < currItems.length; k++) {
        let similarCount = 0;
        let currItem = currItems[k];
        let currZh = currItem.zh.slice(getType(currItem.zh).length).trim();
        let currZhArr = uniq(currZh.replace(reg, ''));
        for (let i = 0; i < newZhArr.length; i++) {
            for (let j = 0; j < currZhArr.length; j++) {
                if (newZhArr[i] === currZhArr[j]) similarCount++;
                if (similarCount >= 2) return true;
            }
        }
    }
    return false;
}

function getType(str) {
    let reg = /^[a-z ]{1,8}\./i;
    let f = str.match(reg);
    if (f) {
        return f[0];
    } else {
        return '';
    }
}

export const wQuizAction = {
    /**
     * 保存访问参数
     * */
    _saveParam: param => ({
        type: ACTION_LT.SAVEPARAM,
        payload: param,
    }),
    /**
     * 请求数据的方法（私有）
     * */
    _request: () => ({
        type: ACTION_LT.REQUEST,
    }),
    /**
     * 接受数据的方法（私有）
     * */
    _receive: result => ({
        type: ACTION_LT.RECEIVE,
        payload: result.rows,
    }),
    /**
     * 改变任务状态
     * */
    _changeTaskStatus: result => ({
        type: ACTION_LT.TASKSTATUS,
        payload: result.status,
    }),
    /**
     * 改变任务名称
     * */
    _changeTaskName: result => ({
        type: ACTION_LT.TASKNAME,
        payload: result.name,
    }),
    /**
     * 修改单词总数
     * */
    _changeWordCount: count => ({
        type: ACTION_LT.CHANGEWORDCOUNT,
        payload: count,
    }),
    /**
     * 开始测试的方法（私有）
     * */
    _test: isStart => ({
        type: ACTION_LT.STARTTEST,
        payload: isStart,
    }),
    /**
     * 结束测试的方法
     * */
    _endTest: isEnd => ({
        type: ACTION_LT.ENDTEST,
        payload: isEnd,
    }),
    /**
     * 改变掌握数量
     * */
    _changeCorrectCount: count => ({
        type: ACTION_LT.CORRECTCOUNT,
        payload: count,
    }),
    /**
     * 改变显示过的单词数量
     * */
    _changeSelectCount: count => ({
        type: ACTION_LT.SELECTCOUNT,
        payload: count,
    }),
    /**
     * 保存错误信息
     * */
    _changeFailureArray: failureArr => ({
        type: ACTION_LT.CHANGEFAILUREARRAY,
        payload: failureArr,
    }),
    /**
     * 内容改变的方法（私有）
     * */
    _changeContent: content => ({
        type: ACTION_LT.CHANGECONTENT,
        payload: content,
    }),
    /**
     * 改变选择状态
     * */
    _changeSelectIndex: selectIndex => ({
        type: ACTION_LT.CHANGESELECTSTATUS,
        payload: selectIndex,
    }),
    /**
     * 改变错误下标
     * */
    _changeFaileIndex: index => ({
        type: ACTION_LT.CHANGEFAILEINDEX,
        payload: index,
    }),
    // 改变错误下标数组
    _changeFaileIndexArray: indexArray => ({
        type: ACTION_LT.CHANGEFAILEINDEXARRAY,
        payload: indexArray,
    }),
    // 改变临时错误下标数组
    _changeFaileTempIndexArray: tempIndexArray => ({
        type: ACTION_LT.CHANGEFAILETEMPINDEXARRAY,
        payload: tempIndexArray,
    }),
    /**
     * 加载单词数组的方法（私有）
     * */
    _loadWords: (param, isInit) => async dispatch => {
        let [error, result] = await fetchData(
            Api.APIURL_User_Learn_Word,
            param
        );
        if (error) {
            CMessage.error(errorMsg(error));
            return;
        }
        console.log(result);
        // 抽取50个
        result.rows = CommonUtil.shuffle(result.rows).slice(0, 50);
        let content = wQuizAction._getContent(result.rows, 0);
        console.log('正确选项: ', content.real_zh + 1);
        dispatch(wQuizAction._changeContent(content));
        dispatch(wQuizAction._changeWordCount(result['rows'].length));
        dispatch(wQuizAction._receive(result));
        dispatch(wQuizAction._changeTaskName(result));
        dispatch(wQuizAction._changeTaskStatus(result));
    },
    /**
     * 获取当前内容的方法（私有）
     * */
    _getContent: (rows, index) => {
        // 生成随机干扰项数量
        let randomCount = 3;
        if (rows.length <= 3) {
            randomCount = rows.length - 1;
        }
        // 获取指定数量的干扰项目
        let interferenceRows = wQuizAction._getInterferenceRows(
            rows,
            index,
            randomCount
        );
        // 随机生成正确下标的值
        let realIndex = CommonUtil.getRandomNumber(randomCount);
        // 生命翻译文字数组
        let zhArr = [];
        // 获取正确的翻译
        let { zh } = wQuizAction._getShortZh(rows[index]);
        zhArr = interferenceRows.map(item => {
            let { zh } = wQuizAction._getShortZh(item);
            return zh;
        });
        // 将正确的翻译元素插入到指定位置
        zhArr.splice(realIndex, 0, zh);
        let content = {
            index: index,
            value: rows[index].word,
            real_zh: realIndex,
            zh: zhArr,
        };
        return content;
    },
    /**
     * 获取指定数量的干扰项目
     * @param rows 数据来源
     * @param index 禁止获取的下标
     * @param count 干扰项的数量
     * @return 指定的干扰项
     * */
    _getInterferenceRows: (rows, index, count) => {
        // 获取禁止下标的词性
        let wordType = rows[index]['type_cine'];
        // 获取所有该词性的元素
        let newRows = [];
        for (let i = 0; i < rows.length; i++) {
            if (index === i) {
                continue;
            }
            if (
                rows[i]['type_cine'] === wordType &&
                !isSimilarRow(rows[i], [...newRows, rows[index]])
            ) {
                newRows.push(rows[i]);
            }
        }
        // 如果数量刚好
        if (newRows.length === count) {
            return newRows;
        }
        // 如果数量超出，随机取出count个
        if (newRows.length > count) {
            let resultRows = [];
            let randomIndexArr = CommonUtil.getRandomNumbers(
                newRows.length - 1,
                count
            );
            for (let i = 0; i < randomIndexArr.length; i++) {
                resultRows.push(newRows[randomIndexArr[i]]);
            }
            return resultRows;
        }
        // 此时表示数量不足,需要补足
        while (newRows.length < count && rows.length > newRows.length + 1) {
            let randomIndex = CommonUtil.getRandomNumber(rows.length - 1);
            if (index === randomIndex) {
                continue;
            }
            let hadRandom = false;
            for (let i = 0; i < newRows.length; i++) {
                if (newRows[i]['word'] === rows[randomIndex]['word']) {
                    hadRandom = true;
                    break;
                }
            }
            if (!hadRandom) {
                newRows.push(rows[randomIndex]);
            }
        }
        return newRows;
    },
    /**
     * 根据翻译文字和词性列表获取准确的翻译文字
     * */
    _getShortZh: word => {
        let rawZh = word.zh;
        let type_cine = word.type_cine;
        let zh;
        let zhs = rawZh.split('\n');
        for (let i = 0; i < zhs.length; i++) {
            if (zhs[i].indexOf(type_cine) !== -1) {
                zh = zhs[i];
                break;
            }
        }

        // 表示没有词性和翻译相同的部分，抽取翻译，词性为空
        if (!zh) {
            zh = zhs[0];
        }
        // 将zh中的词性移除
        // const zhCom = zh.split('.');
        // let index = zhCom.length > 1 ? zhCom.length - 1 : 0;
        // zh = zhCom[index];

        const wordType = getType(zh);
        if (wordType) {
            zh = zh.slice(wordType.length).trim();
        }
        // 将zh中的"；"选项保留到两个及以下
        let zh_component = zh.split('；');
        if (zh_component.length > 2) {
            zh = zh_component[0] + '；' + zh_component[1];
        }
        return { zh: zh };
    },
    /**
     * 加载单词数据（对外调用）
     * */
    loadWords: param => async dispatch => {
        dispatch(wQuizAction._saveParam(param));
        dispatch(wQuizAction._loadWords(param, true));
    },
    updateTask: status => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let param = reducer.get('param');
        if (
            (param.lesson_id && param.lesson_id.indexOf('-') > 0) ||
            param.dict_category_id
        ) {
            return;
        }
        if (param.word_type) {
            param.status = status;
            let wordTypeRes = await fetchData(
                Api.APIURL_User_Content_Course_UpdateStatus,
                param
            );
            console.log('更新本章单词任务: ', wordTypeRes);
            return;
        }
        let taskStatus = reducer.get('taskStatus');
        if (taskStatus === '2') {
            return;
        }
        param['task_status'] = status;
        let taskRes = await fetchData(
            Api.APIURL_User_Learn_UpdateTaskStatus,
            param
        );
        console.log('更新词汇任务: ', taskRes);
    },
    /**
     * 开始测试（对外调用）
     * */
    startTest: () => async dispatch => {
        // 更新任务状态
        dispatch(wQuizAction.updateTask('1'));
        dispatch(wQuizAction._test(true));
    },
    /**
     * 测试结束
     * */
    testDone: () => async (dispatch, getState) => {
        // 上传错误信息
        // 更新测试状态为已完成
        await dispatch(wQuizAction.updateTask('2'));
        await dispatch(wQuizAction.updateFailureWords());
        // 提示用户已完成全部测试（掌握全部单词）
        dispatch(wQuizAction._endTest(true));
    },
    /**
     * 测试未通过
     * */
    testWrong: () => async dispatch => {
        // 上传错误信息
        await dispatch(wQuizAction.updateFailureWords());
        // 提示用户已完成全部测试（掌握全部单词）
        dispatch(wQuizAction._endTest(false));
    },
    /**
     * 上传错误单词信息
     * */
    updateFailureWords: () => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let failureArr = reducer.get('failureArray');
        if (!failureArr || failureArr.length === 0) {
            let failureWord = {
                word: '100',
                word_selected: '100',
                is_correct: '100',
                task_param: reducer.get('param'),
            };
            failureArr = [failureWord];
        }
        console.log('选择错误的单词: ', failureArr);
        if (failureArr && failureArr.length > 0) {
            let res = await fetchData(Api.APIURL_User_Learn_SaveFailure, {
                failure_words: failureArr,
            });
            return res;
        }
        return [null, {}];
    },
    /**
     * 更新测试分数
     * */
    updateScore: score => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let param = reducer.get('param');
        let scoreParam = {
            score: score,
        };
        if (param.lesson_id) {
            scoreParam.lesson_id = param.lesson_id;
        } else if (param.task_id) {
            scoreParam.task_id = param.task_id;
        } else if (param.start_index && param.end_index) {
            scoreParam.lesson_id = `${param.start_index}-${param.end_index}`;
        } else if (param.dict_category_id) {
            scoreParam.dict_category_id = param.dict_category_id;
        }
        let result = await fetchData(Api.APIURL_User_Word_Update, scoreParam);
        return result;
    },
    /**
     * 开始下一个（对外调用）
     * */
    startNext: currentIndex => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let correctCount = reducer.get('correctCount');
        let wordCount = reducer.get('wordCount');
        if (currentIndex === wordCount - 1) {
            let correctRate = correctCount / wordCount;
            let score = parseInt(correctRate * 100, 10);
            await dispatch(wQuizAction.updateScore(score));
            if (correctRate >= 0.9) {
                dispatch(wQuizAction.testDone());
            } else {
                dispatch(wQuizAction.testWrong());
            }
            return;
        }
        let rows = reducer.get('rows');
        let faileIndex = reducer.get('faileIndex');
        let faileIndexArr = reducer.get('faileIndexArr');
        let faileTempIndexArr = reducer.get('faileTempIndexArr');

        let index;
        if (faileIndex === -1) {
            if (currentIndex < wordCount - 1) {
                index = currentIndex + 1;
            } else {
                // 将临时错误数组赋值给错误数组
                dispatch(wQuizAction._changeFaileIndexArray(faileTempIndexArr));
                // 将临时错误数组清空
                dispatch(wQuizAction._changeFaileTempIndexArray([]));
                // 当前错误下标置为 0
                dispatch(wQuizAction._changeFaileIndex(0));
                // 取出错误数组中的第一个值作为下标
                index = faileTempIndexArr[0];
            }
        } else {
            if (faileIndex < faileIndexArr.length - 1) {
                // faileIndex + 1
                faileIndex = faileIndex + 1;
                dispatch(wQuizAction._changeFaileIndex(faileIndex));
                index = faileIndexArr[faileIndex];
            } else {
                // 将临时错误数组赋值给错误数组
                dispatch(wQuizAction._changeFaileIndexArray(faileTempIndexArr));
                // 将临时错误数组清空
                dispatch(wQuizAction._changeFaileTempIndexArray([]));
                // 当前错误下标置为 0
                dispatch(wQuizAction._changeFaileIndex(0));
                // 取出错误数组中的第一个值作为下标
                index = faileTempIndexArr[0];
            }
        }
        let content = wQuizAction._getContent(rows, index);
        console.log('正确选项: ', content.real_zh + 1);
        // 选项清除
        dispatch(wQuizAction._changeSelectIndex(-1));
        // 切换内容
        dispatch(wQuizAction._changeContent(content));
    },
    // 实现定时器，选择正确后的跳转（LEARN_TEST_CORRECT_SELLP）
    selectCorrect: index => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let audioPlayer = reducer.get('audioTruePlayer');
        audioPlayer.play();
        setTimeout(function() {
            dispatch(wQuizAction.startNext(index));
        }, Learn_Word_Correct_SleepTime * 1000);
    },
    // 实现定时器，选择错误后的跳转（LEARN_TEST_WRONG_SELLP）
    selectWrong: index => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let audioPlayer = reducer.get('audioFalsePlayer');
        audioPlayer.play();
        setTimeout(function() {
            dispatch(wQuizAction.startNext(index));
        }, Learn_Word_Failed_SleepTime * 1000);
    },
    /**
     * 点击选中翻译项
     * */
    selectItem: selectIndex => async (dispatch, getState) => {
        // 改变选择状态
        dispatch(wQuizAction._changeSelectIndex(selectIndex));
        // 获取内容信息
        let reducer = getState().WordQuizRedu;
        let content = reducer.get('content');
        let correctCount = reducer.get('correctCount');
        let selectCount = reducer.get('selectCount');
        selectCount += 1;
        dispatch(wQuizAction._changeSelectCount(selectCount));
        let index = content.index;
        if (selectIndex === content.real_zh) {
            let count = correctCount + 1;
            dispatch(wQuizAction._changeCorrectCount(count));
            dispatch(wQuizAction.selectCorrect(index));
        } else {
            // 将错误的下标录入到临时错误数组中
            let faileTempIndexArr = reducer.get('faileTempIndexArr');
            if (faileTempIndexArr === null) {
                faileTempIndexArr = [content['index']];
            } else {
                faileTempIndexArr.push(content['index']);
            }
            // 将选择错误的单词信息保存
            let failureWord = {
                word: content.value,
                word_selected: content.zh[selectIndex],
                is_correct: content.zh[content.real_zh],
                task_param: reducer.get('param'),
            };
            let failureArr = reducer.get('failureArray');
            if (failureArr) {
                failureArr.push(failureWord);
            } else {
                failureArr = [failureWord];
            }
            dispatch(wQuizAction._changeFailureArray(failureArr));
            // 保存错误信息
            dispatch(wQuizAction._changeFaileTempIndexArray(faileTempIndexArr));
            dispatch(wQuizAction.selectWrong(index));
        }
    },
};
