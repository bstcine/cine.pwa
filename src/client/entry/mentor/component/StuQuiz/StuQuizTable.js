/**
 * Created by joe on 4/19/18.
 */
import React from 'react';
import timeUtil from '@/util/timeUtil';

const gradeArr = {
    '0': '学龄前',
    '1': '一年级',
    '2': '二年级',
    '3': '三年级',
    '4': '四年级',
    '5': '五年级',
    '6': '六年级',
    '7': '七年级',
    '8': '八年级',
    '9': '九年级',
    '10': '十年级',
    '11': '十一年级',
    '12': '十二年级',
    '13': '成人',
};

const formatTime = time => {
    if (time) {
        return time.substring(2, 16);
    }
};

const renderQuizList = (list, quizItemClick) => {
    if (list && list.length) {
        return (
            <div className={'studentQuiz'}>
                <div className={'quizHeader'}>
                    <span className={'left create_at'}>提交时间</span>
                    <span>用时</span>
                    <span>批改人</span>
                    <span className={'score'}>得分</span>
                    <span className={'right'}>状态</span>
                </div>
                {list
                    .sort(
                        (a, b) => new Date(b.create_at) - new Date(a.create_at)
                    )
                    .map((item, index) => {
                        let quizStat = '待批改';
                        let quizStatStyle = {
                            color: '#0b4a9e',
                            borderRadius: '0.04rem',
                            border: 'solid 0.02rem #0b4a9e',
                            padding: '0.05rem 0.1rem',
                            boxShadow:
                                '0 0.04rem 0.04rem 0 rgba(57, 83, 122, 0.08)',
                        };
                        switch (item.status) {
                            case '2':
                                quizStat = '批改中';
                                quizStatStyle = { color: '#ee0d0d' };
                                break;
                            case '3':
                                quizStat = '已批改';
                                quizStatStyle = { color: '#1f9d34' };
                                break;
                        }

                        if (item.active === '0') {
                            quizStat = '已重置';
                            quizStatStyle = { color: '#8b8b8c' };
                        }

                        return (
                            <div
                                key={index}
                                className={'quizBody'}
                                onClick={() => {
                                    quizItemClick(item.id, 'check');
                                }}
                            >
                                <div className={'quizItem left create_at'}>
                                    {formatTime(item.create_at)}
                                </div>
                                <div className={'quizItem'}>
                                    {timeUtil.durationShortFormat(
                                        item.duration
                                    )}
                                </div>
                                <div className={'quizItem'}>
                                    {item.checker_nickname || '-'}
                                </div>
                                <div
                                    className={'quizItem score'}
                                    style={{ color: '#ee0d0d' }}
                                >
                                    {item.score || '-'}
                                </div>
                                <div className={'quizItem right'}>
                                    <span style={quizStatStyle}>
                                        {quizStat}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    } else {
        return (
            <div style={{ width: '100%', textAlign: 'center' }}>暂无数据</div>
        );
    }
};

const renderWordList = (list, wordsItemClick) => {
    if (list && list.length) {
        return (
            <div className={'studentWord'}>
                <div className={'wordHeader'}>
                    <span className={'left'}>提交时间</span>
                    <span>用时</span>
                    <span className={'right'}>词汇量</span>
                </div>
                {list
                    .slice(0, 5)
                    .sort(
                        (a, b) => new Date(a.create_at) - new Date(b.create_at)
                    )
                    .map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={'wordBody'}
                                onClick={() => {
                                    wordsItemClick(item.id);
                                }}
                            >
                                <div className={'wordItem left'}>
                                    {formatTime(item.create_at)}
                                </div>
                                <div className={'wordItem'}>
                                    {timeUtil.durationShortFormat(
                                        item.duration
                                    )}
                                </div>
                                <div className={'wordItem right'}>
                                    <span style={{ color: '#ee0d0d' }}>
                                        {item.vocab}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    } else {
        return <div className={'studentNoData'}>暂无数据</div>;
    }
};

const StuQuizTable = ({ list, wordsItemClick, quizItemClick, ...props }) => {
    let students = list.student || [];
    let quizs = list.quiz || [];
    let words = list.word || [];

    if (!students.length) {
        return <div> 没有数据...</div>;
    }

    let quizMap = {};
    quizs.forEach(item => {
        let quizKey = item.user_id;
        let quizVal = quizMap[quizKey] ? quizMap[quizKey] : [];
        quizVal.push(item);
        quizMap[quizKey] = quizVal;
    });

    let wordMap = {};
    words.forEach(item => {
        let wordKey = item.user_id;
        let wordVal = wordMap[wordKey] ? wordMap[wordKey] : [];
        wordVal.push(item);
        wordMap[wordKey] = wordVal;
    });

    let renderList = students.map((item, key) => {
        let student_id = item.student_id;
        let stdQuizs = quizMap[student_id];
        let stdWords = wordMap[student_id];
        return (
            <div key={key} className={'studentPanel'}>
                <div className={'studentInfo'}>
                    <span>{key + 1}</span>
                    <span>{item.student_nickname || item.student_phone}</span>
                    <span>{gradeArr[item.student_grade] || '暂无'}</span>
                    <span>{item.teacher_nickname}</span>
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                    <div className={'studentTitle'}>语法测试</div>
                    {renderQuizList(stdQuizs, quizItemClick)}
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                    <div className={'studentTitle'}>词汇测试</div>
                    {renderWordList(stdWords, wordsItemClick)}
                </div>
                <hr />
            </div>
        );
    });

    return <div className="studentList">{renderList}</div>;
};

export default StuQuizTable;
