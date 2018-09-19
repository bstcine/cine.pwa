/**
 * Created by lidangkun on 2018/7/26.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { ACTION_WC } from '@/constant/actionTypeLearn';
import CommonUtil from '@/util/common.js';

export const wCardAction = {
    _request: () => ({
        type: ACTION_WC.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_WC.RECEIVE,
        payload: result,
    }),
    _changeLastZh: zh => ({
        type: ACTION_WC.CHANGELASTZH,
        payload: zh,
    }),
    _autoChangeWordStatus: status => ({
        type: ACTION_WC.AUTOCHANGEWORDSTATUS,
        payload: status,
    }),
    _reviseChangeWordStatus: status => ({
        type: ACTION_WC.REVISECHANGEWORDSTATUS,
        payload: status,
    }),
    _reviseIndexArray: arr => ({
        type: ACTION_WC.REVISEINDEXARRAY,
        payload: arr,
    }),
    _reviseIndex: index => ({
        type: ACTION_WC.REVISEINDEX,
        payload: index,
    }),
    _changeAutoTime: time => ({
        type: ACTION_WC.AUTOCHANGETIME,
        payload: time,
    }),
    _changeCurrentIndex: index => ({
        type: ACTION_WC.CHANGECURRENTINDEX,
        payload: index,
    }),
    _changeTimer: timer => ({
        type: ACTION_WC.CHANGEAUTOTIMER,
        payload: timer,
    }),
    _changeToggleTimer: timer => ({
        type: ACTION_WC.TOGGLETIMER,
        payload: timer,
    }),
    _toggleBack: isBack => ({
        type: ACTION_WC.TOGGLEBACK,
        payload: isBack,
    }),
    _changeKnown: isKnown => ({
        type: ACTION_WC.CHANGEKNOWNSTATUS,
        payload: isKnown,
    }),
    _originRows: rows => ({
        type: ACTION_WC.ORIGINROWS,
        payload: rows,
    }),
    toggleBack: isBack => async dispatch => {
        if (isBack) {
            dispatch(wCardAction._changeLastZh(''));
        }
        dispatch(wCardAction._toggleBack(isBack));
    },
    // 卡片式学习方法
    loadWordList: (param) => async dispatch => {

        let [error, result] = await fetchData(Api.APIURL_User_Learn_Word, param);

        if (!error) {
            // 备份原始数组
            dispatch(wCardAction._originRows(result.rows));
            // 移除所有已认识的单词
            let newRows = []
            result.rows.forEach((ele) => {
                if (!ele.is_known) {
                    newRows.push(ele);
                }
            });
            result.rows = newRows;
            dispatch(wCardAction._receive(result));
        }
    },
    // 改变自动播放状态
    changeAutoChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isAutoChangeWord = !reducer.get('isAutoChangeWord');
        let autoChangeTime = reducer.get('autoChangeTime');
        dispatch(wCardAction._autoChangeWordStatus(isAutoChangeWord));
        let timer = reducer.get('timer');
        if (timer) {
            clearInterval(timer);
        }
        if (isAutoChangeWord) {
            dispatch(wCardAction.startNext(true));
            timer = setInterval(() => {
                dispatch(wCardAction.startNext(true));
            }, autoChangeTime * 1000);
        } else {
            timer = null;
            let toggleTimer = reducer.get('toggleTimer');
            if (toggleTimer) {
                clearTimeout(toggleTimer);
            }
        }
        dispatch(wCardAction._changeTimer(timer));
    },
    // 改变自动播放时间间隔
    changeAutoChangeTime: (time) => async dispatch => {
        dispatch(wCardAction._changeAutoTime(time));
    },
    // 改变随机播放状态
    changeReviseChangeWordStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isReviseChangeWord = !reducer.get('isReviseChangeWord');
        dispatch(wCardAction._reviseChangeWordStatus(isReviseChangeWord));
        dispatch(wCardAction.resetRevise());
    },
    // 重置随机下标数组和当前随机下标
    resetRevise: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isReviseChangeWord = reducer.get('isReviseChangeWord');
        if (!isReviseChangeWord) {
            return;
        }
        // 生成新的一组随机下标值
        let result = reducer.get('result');
        if (!result || !result.rows || result.rows.length === 0) {
            return;
        }
        let randomNums = CommonUtil.getRandomNumbers(result.rows.length - 1, result.rows.length);
        console.log(randomNums, result.rows);
        dispatch(wCardAction._reviseIndexArray(randomNums));
        // 将当前随机下标置为零
        dispatch(wCardAction._reviseIndex(0));
    },
    // 切换正反面
    changFrontOrBack: () => (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isBack = !reducer.get('isBack');
        dispatch(wCardAction.toggleBack(isBack));
    },
    // 切换已认识状态
    changeKnownStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isKnown = !reducer.get('isKnown');
        dispatch(wCardAction._changeKnown(isKnown));
    },
    // 更新已认识状态，并移除对应元素
    updateWordKnownStatus: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let isKnown = reducer.get('isKnown');
        if (!isKnown) {
            return false;
        }
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let word = result.rows[currentIndex].word;
        let id = result.rows[currentIndex].id;
        let [error, _updateRes] = await fetchData(Api.
            APIURL_User_Content_Word_UpdateKnow, { 'word': { 'word': word, 'id': id }, 'is_known': true });
        if (error) {
            return false;
        } else {
            if (_updateRes.status === false) {
                return false;
            }
        }
        // 更新成功，移除当前元素
        result.rows[currentIndex].is_known = true;
        result.rows.splice(currentIndex, 1);
        dispatch(wCardAction.resetRevise());
        return true;
    },
    // 再背一次
    repeatCard: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let originRows = reducer.get('originRows');
        let wordList = [];
        originRows.forEach((ele) => {
            let word = {
                'word': ele.word,
                'id': ele.id,
            };
            wordList.push(word);
        });
        let [error, _updateRes] = await fetchData(Api.APIURL_User_Content_Word_UpdateKnow, { 'word_list': wordList, 'is_known': false });
        if (!error && _updateRes && _updateRes.status) {
            let newRows = [];
            originRows.forEach((ele) => {
                ele.is_known = false;
                newRows.push(ele);
            });
            let result = reducer.get('result');
            let newResult = {
                name: result.name,
                status: result.status,
                rows: newRows,
            };
            dispatch(wCardAction._changeCurrentIndex(0));
            dispatch(wCardAction._receive(newResult));
            dispatch(wCardAction.resetRevise());
        }
    },
    // 背诵下一个单词
    startNext: (isAuto) => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let isKnown = reducer.get('isKnown');
        let rows = result.rows;
        if (!rows || rows.length === 0) {
            return;
        }
        const currentZh = rows[currentIndex].zh;
        console.log('当前的汉语翻译: ', currentZh);
        dispatch(wCardAction._changeLastZh(currentZh));
        let updateStatus = await dispatch(wCardAction.updateWordKnownStatus());
        let reviseIndex = reducer.get('reviseCurrentIndex');
        let reviseArray = reducer.get('reviseIndexArray');
        let isRevise = reducer.get('isReviseChangeWord');
        if (isRevise && rows.length > 3) {
            if (reviseArray.length === reviseIndex + 1) {
                if (!updateStatus) {
                    await dispatch(wCardAction.resetRevise());
                }
                reviseIndex = 0;
            } else {
                reviseIndex += 1;
                dispatch(wCardAction._reviseIndex(reviseIndex));
            }
            currentIndex = reviseArray[reviseIndex];
        } else {
            if (updateStatus) {
                currentIndex -= 1;
            }
            if (rows.length === currentIndex + 1) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
        // 反面切换到正面
        if (isBack) {
            dispatch(wCardAction.toggleBack(false));
        }
        // 已认识切换到不认识
        if (isKnown) {
            dispatch(wCardAction._changeKnown(false));
        }
        // 自动播放声音
        dispatch(wCardAction.playPhonetic());
        const isAutoChangeWord = reducer.get('isAutoChangeWord');
        if (isAutoChangeWord && isAuto) {
            // 开启翻转定时器
            let toggleTimer = setTimeout(() => {
                dispatch(wCardAction.toggleBack(true));
                dispatch(wCardAction._changeToggleTimer(null));
            }, 2000);
            dispatch(wCardAction._changeToggleTimer(toggleTimer));
        } else {
            const toggleTimer = reducer.get('toggleTimer');
            // 删除翻转定时器
            if (toggleTimer) {
                clearTimeout(toggleTimer);
                dispatch(wCardAction._changeToggleTimer(null));
            }
        }
    },
    // 背诵上一个单词
    startPrevious: () => async (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        let isBack = reducer.get('isBack');
        let isKnown = reducer.get('isKnown');
        let rows = result.rows;
        if (!rows || rows.length === 0) {
            return;
        }
        const currentZh = rows[currentIndex].zh;
        console.log('当前的汉语翻译: ', currentZh);
        dispatch(wCardAction._changeLastZh(currentZh));
        let updateStatus = await dispatch(wCardAction.updateWordKnownStatus());
        let reviseIndex = reducer.get('reviseCurrentIndex');
        let reviseArray = reducer.get('reviseIndexArray');
        let isRevise = reducer.get('isReviseChangeWord');
        if (isRevise && rows.length > 3) {
            if (reviseIndex === 0) {
                if (!updateStatus) {
                    dispatch(wCardAction.resetRevise());
                }
                reviseIndex = reviseArray.length - 1;
            } else {
                reviseIndex -= 1;
            }
            dispatch(wCardAction._reviseIndex(reviseIndex));
            currentIndex = reviseArray[reviseIndex];
        } else {
            if (currentIndex === 0) {
                currentIndex = rows.length - 1;
            } else {
                currentIndex -= 1;
            }
        }
        dispatch(wCardAction._changeCurrentIndex(currentIndex));
        if (isBack) {
            dispatch(wCardAction.toggleBack(false));
        }
        // 已认识切换到不认识
        if (isKnown) {
            dispatch(wCardAction._changeKnown(false));
        }
        // 自动播放声音
        dispatch(wCardAction.playPhonetic());
    },
    // 播放音频
    playPhonetic: () => (dispatch, getState) => {
        let reducer = getState().WordCardRedu;
        let currentIndex = reducer.get('currentIndex');
        let result = reducer.get('result');
        if (!result || !result.rows || result.rows.length <= currentIndex) {
            return;
        }
        let { voice_url_a, voice_url_b } = result.rows[currentIndex];
        let voice_url = voice_url_b;
        if (!voice_url) {
            voice_url = voice_url_a;
        }
        let player = reducer.get('player');
        player.src = 'http://oss.bstcine.com/word/top10000/' + voice_url;
        player.play();
    }
};