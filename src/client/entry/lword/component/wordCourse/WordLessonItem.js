import React from 'react';

const WordLessonItem = ({ item, actions }) => {
    let quizClassName = 'default';
    let quizScore = '-';
    if (item.wQuizScore !== -1) {
        quizScore = item.wQuizScore + '%';
        if (item.wQuizScore < 90) {
            quizClassName = 'quiz';
        } else if (item.wQuizScore <= 100) {
            quizClassName = 'quiz90';
        }
    }
    const className =
        'lesson ' + quizClassName + (item.isLastVisit ? ' lastVisit' : '');
    const classNameMiddle = quizClassName === 'quiz90' ? 'middle90' : 'middle';
    const classNameScore = quizClassName === 'quiz90' ? 'score90' : '';
    return (
        <React.Fragment>
            <a href="/experiences" target="_blank">
                <div className={className}>
                    <div className="top">
                        <div className="no">第{item.id}组</div>
                        <div className="fromto">{item.value}</div>
                    </div>

                    <div className={classNameMiddle} />
                    <div className="bottom">
                        <div className={'quizScore ' + classNameScore}>
                            {quizScore}
                        </div>
                        <div className="quiz">测试成绩</div>
                    </div>
                </div>
            </a>
        </React.Fragment>
    );
};

export default WordLessonItem;
