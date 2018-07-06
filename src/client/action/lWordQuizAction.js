/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LT } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';
import { Learn_Word_Correct_SleepTime, Learn_Word_Failed_SleepTime } from '@/constant/index';

const Vocabulary = {
    n: ['n.'],
    v: ['vt.', 'vi.'],
    j: ['adj.'],
    i: ['prep.'],
    r: ['adv.'],
    p: ['pron.'],
    c: ['conj'],
    u: ['int.'],
};

export const lWordQuizAction = {
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
     * 改变掌握数量
     * */
    _changeCorrectCount: count => ({
        type: ACTION_LT.CORRECTCOUNT,
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
        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);
        if (error) {
            dispatch(toastAction.showError(errorMsg(error)));
            return;
        }
        let content = lWordQuizAction._getContent(result.rows, 0);
        dispatch(lWordQuizAction._changeContent(content));
        dispatch(lWordQuizAction._changeWordCount(result['rows'].length));
        dispatch(lWordQuizAction._receive(result));
        dispatch(lWordQuizAction._changeTaskStatus(result));
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
        let interferenceRows = lWordQuizAction._getInterferenceRows(rows, index, randomCount);
        // 随机生成正确下标的值
        let realIndex = lWordQuizAction.getRandomNumber(randomCount);
        // 生命翻译文字数组
        let zhArr = [];
        // 获取正确的翻译
        let { zh } = lWordQuizAction._getChinessTransition(rows[index].type, rows[index].zh);
        zhArr = interferenceRows.map((item) => {
            let { zh } = lWordQuizAction._getChinessTransition(item.type, item.zh);
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
        let wordType = rows[index]['type'];
        let wordValue = rows[index]['word'];
        // 获取所有该词性的元素
        let newRows = [];
        for (let i = 0; i < rows.length; i++) {
            if (rows[i]['word'] === wordValue) {
                continue;
            }
            if (rows[i]['type'] === wordType) {
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
            let randomIndexArr = lWordQuizAction.getRandomNumbers(newRows.length - 1, count);
            for (let i = 0; i < randomIndexArr.length; i++) {
                resultRows.push(newRows[randomIndexArr[i]]);
            }
            return resultRows;
        }
        // 此时表示数量不足,需要补足
        while (newRows.length < count) {
            let randomIndex = lWordQuizAction.getRandomNumber(rows.length - 1);
            let hadRandom = false;
            for (let i = 0; i < newRows.length; i++) {
                if (newRows[i]['word'] === rows[randomIndex]['word'] || wordValue === rows[randomIndex]['word']) {
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
    _getChinessTransition: (wordType, originZH) => {
        if (wordType === null || originZH === null) {
            toastAction.show('data error');
            return null;
        }
        let vocabularyList = Vocabulary[wordType];
        let zhs = originZH.split('\n');
        let zh;
        if (vocabularyList && vocabularyList.length > 0) {
            let hadZh = false;
            for (let j = 0; j < zhs.length; j++) {
                if (hadZh) {
                    break;
                }

                for (let i = 0; i < vocabularyList.length; i++) {
                    if (zhs[j].indexOf(vocabularyList[i]) > -1) {
                        zh = zhs[j];
                        hadZh = true;
                        break;
                    }
                }
            }
        }
        // 表示没有词性和翻译相同的部分，抽取翻译，词性为空
        if (!zh) {
            zh = zhs[0];
        }
        // 将zh中的词性移除
        zh = zh.split('.');
        let index = zh.length > 1 ? 1 : 0;
        zh = zh[index];
        // 将zh中的"；"选项保留到两个及以下
        let zh_component = zh.split('；');
        if (zh_component.length > 2) {
            zh = zh_component[0] + '；' + zh_component[1]
        }
        return { zh: zh };
    },
    /**
     * 加载单词数据（对外调用）
     * */
    loadWords: (param) => async dispatch => {
        dispatch(lWordQuizAction._saveParam(param));
        dispatch(lWordQuizAction._loadWords(param, true));
    },
    updateTask: (status) => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let taskStatus = reducer.get('taskStatus');
        if (taskStatus === '2') {
            return;
        }
        let param = reducer.get('param');
        param['task_status'] = status;
        let [error, result] = await fetchData(Api.APIURL_User_Learn_UpdateTaskStatus, param);
        if (error) {
            alert(error);
        } else {
            console.log(result);
        }
    },
    /**
     * 开始测试（对外调用）
     * */
    startTest: () => async dispatch => {
        // 更新任务状态
        dispatch(lWordQuizAction.updateTask('1'));
        dispatch(lWordQuizAction._test(true));
    },
    /**
     * 测试结束
     * */
    testDone: () => async (dispatch, getState) => {
        // 上传错误信息
        let reducer = getState().WordQuizRedu;
        let failureArr = reducer.get('failureArray');
        if (failureArr) {
            let [result] = await fetchData(Api.APIURL_User_Learn_SaveFailure, { failure_words: failureArr });
            console.log(result);
        }
        // 更新测试状态为已完成
        dispatch(lWordQuizAction.updateTask('2'));
        // 提示用户已完成全部测试（掌握全部单词）
        dispatch(toastAction.show('测试完成'));
        // 返回学习界面
        setTimeout(function () {
            location.href = '/learn';
        }, 250);
    },
    /**
     * 开始下一个（对外调用）
     * */
    startNext: (currentIndex) => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let correctCount = reducer.get('correctCount');
        let wordCount = reducer.get('wordCount');
        if (correctCount === wordCount) {
            dispatch(lWordQuizAction.testDone())
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
                dispatch(lWordQuizAction._changeFaileIndexArray(faileTempIndexArr));
                // 将临时错误数组清空
                dispatch(lWordQuizAction._changeFaileTempIndexArray([]));
                // 当前错误下标置为 0
                dispatch(lWordQuizAction._changeFaileIndex(0));
                // 取出错误数组中的第一个值作为下标
                index = faileTempIndexArr[0];
            }
        } else {
            if (faileIndex < faileIndexArr.length - 1) {
                // faileIndex + 1
                faileIndex = faileIndex + 1;
                dispatch(lWordQuizAction._changeFaileIndex(faileIndex));
                index = faileIndexArr[faileIndex];
            } else {
                // 将临时错误数组赋值给错误数组
                dispatch(lWordQuizAction._changeFaileIndexArray(faileTempIndexArr));
                // 将临时错误数组清空
                dispatch(lWordQuizAction._changeFaileTempIndexArray([]));
                // 当前错误下标置为 0
                dispatch(lWordQuizAction._changeFaileIndex(0));
                // 取出错误数组中的第一个值作为下标
                index = faileTempIndexArr[0];
            }
        }
        let content = lWordQuizAction._getContent(rows, index);
        // 选项清除
        dispatch(lWordQuizAction._changeSelectIndex(-1));
        // 切换内容
        dispatch(lWordQuizAction._changeContent(content));
    },
    // 实现定时器，选择正确后的跳转（LEARN_TEST_CORRECT_SELLP）
    selectCorrect: (index) => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let audioPlayer = reducer.get('audioTruePlayer');
        audioPlayer.play();
        setTimeout(function () {
            dispatch(lWordQuizAction.startNext(index));
        }, Learn_Word_Correct_SleepTime * 1000);
    },
    // 实现定时器，选择错误后的跳转（LEARN_TEST_WRONG_SELLP）
    selectWrong: (index) => async (dispatch, getState) => {
        let reducer = getState().WordQuizRedu;
        let audioPlayer = reducer.get('audioFalsePlayer');
        audioPlayer.play();
        setTimeout(function () {
            dispatch(lWordQuizAction.startNext(index));
        }, Learn_Word_Failed_SleepTime * 1000);
    },
    /**
     * 点击选中翻译项
     * */
    selectItem: (selectIndex) => async (dispatch, getState) => {
        // 改变选择状态
        dispatch(lWordQuizAction._changeSelectIndex(selectIndex));
        // 获取内容信息
        let reducer = getState().WordQuizRedu;
        let content = reducer.get('content');
        let correctCount = reducer.get('correctCount');
        let index = content.index;
        if (selectIndex === content.real_zh) {
            let count = correctCount + 1;
            dispatch(lWordQuizAction._changeCorrectCount(count));
            dispatch(lWordQuizAction.selectCorrect(index));
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
            dispatch(lWordQuizAction._changeFailureArray(failureArr));
            // 保存错误信息
            dispatch(lWordQuizAction._changeFaileTempIndexArray(faileTempIndexArr));
            dispatch(lWordQuizAction.selectWrong(index));
        }
    },
    /**
     * @ 获取不重复的随机数（int）
     * @param max 最大范围
     * @param count 获取的数量
     * @return 随机数组
     */
    getRandomNumbers: (max, count) => {
        let numbers = [];
        while (numbers.length < count) {
            let randomNumer = lWordQuizAction.getRandomNumber(max);
            if (numbers.length === 0) {
                numbers.push(randomNumer);
                continue;
            }
            let hadNumber = false;
            for (let i = 0; i < numbers.length; i++) {
                if (numbers[i] === randomNumer) {
                    hadNumber = true;
                    break;
                }
            }
            if (!hadNumber) {
                numbers.push(randomNumer);
            }
        }
        return numbers;
    },
    /**
     * @ 获取随机数
     * @ max 最大范围
     * @return 生成数值
     * */
    getRandomNumber: (max) => {
        return Math.round(Math.random() * max);
    },
};