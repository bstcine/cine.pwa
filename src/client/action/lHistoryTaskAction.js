/**
 * Created by lidangkun on 2018/6/15.
 */
import Api from '../../APIConfig';
import { fetchData } from '@/service/base';
import { fromJS } from 'immutable';
import { ACTION_LH } from '@/constant/actionTypeLearn';
import { toastAction } from '@/action/commonAction';
import errorMsg from '@/util/errorMsg';

export const actionHistoryTask = {
    _request: () => ({
        type : ACTION_LH.REQUEST,
    }),

    _receive: result => ({
        type: ACTION_LH.RECEIVE,
        payload: result,
    }),
    _dialogShow: isShow => ({
        type: ACTION_LH.DIALOG,
        payload: isShow,
    }),

    // 加载历史任务数据
    loadHistoryTask: () => (dispatch) => {

        let models = [
            {
                "title":"2018年05月23日",
                "content":[
                    {
                        "type":"视频",
                        "text":"基础词汇",
                    },
                    {
                        "type":"习题",
                        "text":"《大门据了解》第1课",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    }
                ]
            },
            {
                "title":"2018年05月22日",
                "content":[
                    {
                        "type":"习题",
                        "text":"加紧开发焦恩俊",
                    },
                    {
                        "type":"习题",
                        "text":"《时代峻峰是》发破碎机",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    },
                    {
                        "type":"其他",
                        "text":"设计费破位看平台破解副教授积分",
                    },
                ]
            },
            {
                "title":"2018年05月21日",
                "content":[
                    {
                        "type":"其他",
                        "text":"数据库福建省立刻0",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    }
                ]
            },
            {
                "title":"2018年05月17日",
                "content":[
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    }
                ]
            },
            {
                "title":"2018年05月16日",
                "content":[
                    {
                        "type":"其他",
                        "text":"合肥市会计师",
                    },
                    {
                        "type":"视频",
                        "text":"基础词汇",
                    },
                    {
                        "type":"习题",
                        "text":"《大门据了解》第1课",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    },
                    {
                        "type":"习题",
                        "text":"《大门据了解》第1课",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                ]
            },
            {
                "title":"2018年05月15日",
                "content":[
                    {
                        "type":"视频",
                        "text":"基础词汇",
                    },
                    {
                        "type":"习题",
                        "text":"《大门据了解》第1课",
                    },
                    {
                        "type":"习题",
                        "text":"《动物；莱克斯顿；李开复；吗；临时21道了声》第10课",
                    },
                    {
                        "type":"单词",
                        "text":"教师节福利破解进口量",
                    },
                    {
                        "type":"其他",
                        "text":"睡觉流口水Wila金额",
                    }
                ]
            },
        ];

        dispatch(actionHistoryTask._receive(models));
    },

    // dialog窗口显示/隐藏
    dialogShow: () => (dispatch) => {
        // 获取显示隐藏
        dispatch(actionHistoryTask._dialogShow(true));
    },

};