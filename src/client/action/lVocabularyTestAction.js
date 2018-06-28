/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_LT } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';
import { LEARN_TEST_CORRECT_SELLP, LEARN_TEST_WRONG_SELLP } from '@/constant/index';

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

export const actionVocabularyTest = {
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
     * 内容改变的方法（私有）
     * */
    _changeContent: content => ({
        type: ACTION_LT.CHANGECONTENT,
        payload: content,
    }),
    /**
     * 改变选择状态
     * */
    _changeSelectStatus: status => ({
        type: ACTION_LT.CHANGESELECTSTATUS,
        payload: status,
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
        let content = actionVocabularyTest._getContent(result.rows, 0);
        dispatch(actionVocabularyTest._changeContent(content));
        dispatch(actionVocabularyTest._receive(result));
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
        let interferenceRows = actionVocabularyTest._getInterferenceRows(rows, index, randomCount);
        // 随机生成正确下标的值
        let realIndex = actionVocabularyTest.getRandomNumber(randomCount);
        // 生命翻译文字数组
        let zhArr = [];
        // 获取正确的翻译
        let { zh } = actionVocabularyTest._getChinessTransition(rows[index].type, rows[index].zh);
        for (let i = 0; i < interferenceRows.length; i++) {
            let { zh } = actionVocabularyTest._getChinessTransition(interferenceRows[i].type, interferenceRows[i].zh);
            zhArr.push(zh);
        }
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
        let wordType = rows[index].type;
        // 获取所有该词性的元素
        let newRows = []
        for (let i = 0; i < rows.length; i++) {
            if (rows[i] === rows[index]) {
                continue;
            }
            if (rows[i].type === wordType) {
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
            let randomIndexArr = actionVocabularyTest.getRandomNumbers(newRows.length - 1, count);
            for (let i = 0; i < randomIndexArr.length; i++) {
                resultRows.push(newRows[randomIndexArr[i]]);
            }
            return resultRows;
        }
        // 此时表示数量不足,需要补足
        while (newRows.length < count) {
            let randomIndex = actionVocabularyTest.getRandomNumber(rows.length);
            let hadRandom = false;
            for (let i = 0; i < newRows.length; i++) {
                if (newRows[i] === rows[randomIndex]) {
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
        if (wordType === undefined || originZH === undefined) {
            toastAction.show('data error');
            return null;
        }
        let vocabularyList = Vocabulary[wordType];
        let zhs = originZH.split('\n');
        if (vocabularyList !== undefined && vocabularyList !== null && vocabularyList.length > 0) {
            for (let i = 0; i < vocabularyList.length; i++) {
                for (let j = 0; j < zhs.length; j++) {
                    if (zhs[j].indexOf(vocabularyList[i]) > -1) {
                        return { zh: zhs[j] };
                    }
                }
            }
        }
        // 表示没有词性和翻译相同的部分，抽取翻译，词性为空
        if (zhs.length === 0) {
            return {
                zh: zhs[0],
            };
        }
        // 获取不违反规定的随机数
        let randomIndex = actionVocabularyTest.getRandomNumber(zhs.length - 1);
        return {
            zh: zhs[randomIndex],
        };
    },
    /**
     * 加载单词数据（对外调用）
     * */
    loadWords: (startIndex, endIndex, wordType) => async dispatch => {
        if (startIndex === 'undefined') {
            startIndex = undefined;
        }
        if (endIndex === 'undefined') {
            endIndex = undefined;
        }
        if (wordType === 'undefined') {
            wordType = null;
        }
        let param = {
            start_index: startIndex,
            end_index: endIndex,
            word_type: wordType,
        };
        dispatch(actionVocabularyTest._loadWords(param, true));
    },
    /**
     * 开始测试（对外调用）
     * */
    startTest: () => async dispatch => {
        dispatch(actionVocabularyTest._test(true));
    },
    /**
     * 开始下一个（对外调用）
     * */
    startNext: (rows, currentIndex) => async dispatch => {
        let index = currentIndex + 1;
        let content = actionVocabularyTest._getContent(rows, index);
        // 选项清除
        dispatch(actionVocabularyTest._changeSelectStatus(-1));
        // 切换内容
        dispatch(actionVocabularyTest._changeContent(content));
    },
    // 实现定时器，选择正确后的跳转（LEARN_TEST_CORRECT_SELLP）
    selectCorrect: (rows, index) => async dispatch => {
        let timerId = setTimeout(function () {
            dispatch(actionVocabularyTest.startNext(rows, index));
            clearTimeout(timerId);
        }, LEARN_TEST_CORRECT_SELLP * 1000);
    },
    // 实现定时器，选择错误后的跳转（LEARN_TEST_WRONG_SELLP）
    selectWrong: (rows, index) => async dispatch => {
        let timerId = setTimeout(function () {
            dispatch(actionVocabularyTest.startNext(rows, index));
            clearTimeout(timerId);
        }, LEARN_TEST_WRONG_SELLP * 1000);
    },
    /**
     * 点击选中翻译项
     * */
    selectItem: (zh_index, content, correctCount, rows) => async dispatch => {
        dispatch(actionVocabularyTest._changeSelectStatus(zh_index));
        let index = content.index;
        if (zh_index === content.real_zh) {
            let count = correctCount + 1;
            dispatch(actionVocabularyTest._changeCorrectCount(count));
            dispatch(actionVocabularyTest.selectCorrect(rows, index));
        } else {
            dispatch(actionVocabularyTest.selectWrong(rows, index));
        }
    },
    /**
     * @ 获取不重复的随机数（int）
     * @param max 最大范围
     * @param count 获取的数量
     * @return 随机数组
     */
    getRandomNumbers: (max, count) => {
        let numbers = []
        while (numbers.length < count) {
            let randomNumer = actionVocabularyTest.getRandomNumber(max);
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