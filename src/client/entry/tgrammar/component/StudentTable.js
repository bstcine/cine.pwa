/**
 * Created by joe on 4/19/18.
 */
import React from 'react';

const formatTime = time => {
    if (time) {
        return time.substring(2, 16);
    }
};

const formatDuration = duration => {
    let number = parseInt(duration, 10);
    let sec = number % 60;
    let min = (number - sec) / 60;
    let str = '';
    min && (str += min + '分');
    sec && (str += sec + '秒');
    return str;
};

const renderQuizList = (list, quizsItemClick) => {
    if (list && list.length) {
        return (
            <div className={'studentQuiz'}>
                <div className={'quizHeader'}>
                    <span className={'left'}>提交时间</span>
                    <span>用时</span>
                    <span>批改人</span>
                    <span>得分</span>
                    <span className={'right'}>状态</span>
                </div>
                {list.map((item, index) => {
                    let quizStat = '待批改';
                    let quizStatStyle = {
                        color: '#113f82',
                        borderStyle: 'solid',
                        borderWidth: '.02rem',
                        paddingTop: '.05rem',
                        paddingLeft: '.1rem',
                        paddingRight: '.1rem',
                        paddingBottom: '.05rem',
                        cursor: 'pointer',
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
                        <div key={index} className={'quizBody'}>
                            <div className={'quizItem left'}>
                                {formatTime(item.create_at)}
                            </div>
                            <div className={'quizItem'}>
                                {formatDuration(item.duration)}
                            </div>
                            <div className={'quizItem'}>
                                {item.checker_nickname}
                            </div>
                            <div className={'quizItem'}>{item.score}</div>
                            <div
                                className={'quizItem right'}
                                onClick={() => {
                                    if (
                                        item.active === '1' &&
                                        item.status === '1'
                                    ) {
                                        quizsItemClick(item.id);
                                    }
                                }}>
                                <span style={quizStatStyle}>{quizStat}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <div style={{ width: '100%', textAlign: 'center' }}>暂无数据</div>;
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
                {list.slice(0, 5).map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={'wordBody'}
                            onClick={() => {
                                wordsItemClick(item.id);
                            }}>
                            <div className={'wordItem left'}>
                                {formatTime(item.create_at)}
                            </div>
                            <div className={'wordItem'}>
                                {formatDuration(item.duration)}
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

const StudentTable = ({ list, wordsItemClick, quizsItemClick, ...props }) => {
    let students = list.student || [];
    let quizs = list.quiz || [];
    let words = list.word || [];

    if (!students.length) {
        return <div> 没有数据...</div>;
    }

    let quizMap = {};
    quizs.forEach(item => {
        let quizKey = item.user_id;
        let quizVal = quizMap[quizKey] ? quizMap[quizKey] : [item];
        quizVal.push(item);
        quizMap[quizKey] = quizVal;
    });

    let wordMap = {};
    words.forEach(item => {
        let wordKey = item.user_id;
        let wordVal = wordMap[wordKey] ? wordMap[wordKey] : [item];
        wordVal.push(item);
        wordMap[wordKey] = wordVal;
    });

    console.log(students, quizMap, wordMap);

    let renderList = students.map((item, key) => {
        let student_id = item.student_id;
        let stdQuizs = quizMap[student_id];
        let stdWords = wordMap[student_id];
        return (
            <div key={key} className={'studentPanel'}>
                <div className={'studentInfo'}>
                    <span>{key + 1}</span>
                    <span>{item.student_nickname}</span>
                    <span>{item.student_login}</span>
                    <span>{item.teacher_nickname}</span>
                </div>
                <hr />
                <div style={{ display: 'flex' }}>
                    <div className={'studentTitle'}>语法测试</div>
                    {renderQuizList(stdQuizs, quizsItemClick)}
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

export default StudentTable;
